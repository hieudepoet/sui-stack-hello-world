import { useState, useEffect, useCallback } from 'react'
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { Transaction } from '@mysten/sui/transactions'
import { config } from '../config'
import type { Greeting, OnChainGreeting } from '../types'

export function useGreetings() {
  const [greetings, setGreetings] = useState<Greeting[]>([])
  const [onChainGreetings, setOnChainGreetings] = useState<OnChainGreeting[]>([])
  const [myOnChainGreetings, setMyOnChainGreetings] = useState<OnChainGreeting[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const account = useCurrentAccount()
  const suiClient = useSuiClient()
  const { mutate: signAndExecute } = useSignAndExecuteTransaction()

  // Fetch ALL shared greetings (for Global tab)
  const fetchSharedGreetings = useCallback(async () => {
    if (!config.sui.packageId) return

    try {
      console.log('Fetching all shared greetings...')
      
      // Query for GreetingCreated events
      const response = await suiClient.queryEvents({
        query: {
          MoveEventType: `${config.sui.packageId}::greeting::GreetingCreated`
        },
        limit: 50,
        order: 'descending'
      })

      console.log('Events found:', response.data.length)

      // Get unique greeting IDs from events
      const greetingIds = new Set<string>()
      for (const event of response.data) {
        if (event.parsedJson && typeof event.parsedJson === 'object' && 'greeting_id' in event.parsedJson) {
          const greetingId = event.parsedJson.greeting_id as string
          greetingIds.add(greetingId)
        }
      }

      // Fetch the actual greeting objects
      const sharedGreetings: OnChainGreeting[] = []
      for (const id of greetingIds) {
        try {
          const obj = await suiClient.getObject({
            id,
            options: { 
              showContent: true,
              showOwner: true 
            }
          })

          if (obj.data?.content && 'fields' in obj.data.content) {
            const fields = obj.data.content.fields as Record<string, unknown>
            sharedGreetings.push({
              objectId: obj.data.objectId,
              text: (fields.text as string) || '',
              // owner: (fields.owner as string) || ''
            })
          }
        } catch (err) {
          console.error(`Failed to fetch greeting ${id}:`, err)
        }
      }

      console.log('Total shared greetings fetched:', sharedGreetings.length)
      setOnChainGreetings(sharedGreetings)
    } catch (err) {
      console.error('Failed to fetch shared greetings:', err)
    }
  }, [suiClient])

  // Fetch greetings created by current user (for Private tab)
  const fetchMyGreetings = useCallback(async () => {
    if (!account?.address || !config.sui.packageId) return

    try {
      console.log('Fetching my greetings for address:', account.address)
      
      // Query for GreetingCreated events filtered by sender
      const response = await suiClient.queryEvents({
        query: {
          MoveEventType: `${config.sui.packageId}::greeting::GreetingCreated`,
        },
        limit: 50,
        order: 'descending'
      })

      console.log('My events found:', response.data.length)

      // Get greeting IDs from events created by this user
      const myGreetingIds: string[] = []
      for (const event of response.data) {
        if (event.parsedJson && typeof event.parsedJson === 'object') {
          const parsedEvent = event.parsedJson as { greeting_id?: string; creator?: string }
          
          // Double check creator matches current account
          if (parsedEvent.greeting_id && parsedEvent.creator === account.address) {
            myGreetingIds.push(parsedEvent.greeting_id)
            console.log('Found my greeting:', parsedEvent.greeting_id)
          }
        }
      }

      // Fetch the actual greeting objects
      const myGreetings: OnChainGreeting[] = []
      for (const id of myGreetingIds) {
        try {
          const obj = await suiClient.getObject({
            id,
            options: { 
              showContent: true,
              showOwner: true 
            }
          })

          if (obj.data?.content && 'fields' in obj.data.content) {
            const fields = obj.data.content.fields as Record<string, unknown>
            myGreetings.push({
              objectId: obj.data.objectId,
              text: (fields.text as string) || '',
              // owner: (fields.owner as string) || '',
            })
          }
        } catch (err) {
          console.error(`Failed to fetch my greeting ${id}:`, err)
        }
      }

      console.log('Total my greetings fetched:', myGreetings.length)
      setMyOnChainGreetings(myGreetings)
    } catch (err) {
      console.error('Failed to fetch my greetings:', err)
    }
  }, [account?.address, suiClient])

  useEffect(() => {
    // Fetch all greetings when component mounts
    fetchSharedGreetings()
  }, [fetchSharedGreetings])

  useEffect(() => {
    // Fetch user's greetings when account changes
    if (account?.address) {
      fetchMyGreetings()
    } else {
      setMyOnChainGreetings([])
    }
  }, [account?.address, fetchMyGreetings])

  const addLocalGreeting = (text: string) => {
    const greeting: Greeting = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: Date.now(),
      isOnChain: false
    }
    setGreetings(prev => [greeting, ...prev])
  }

  const createOnChainGreeting = async (text: string) => {
    if (!account || !text.trim()) return

    setIsLoading(true)
    setError(undefined)

    const tx = new Transaction()
    tx.moveCall({
      target: `${config.sui.packageId}::greeting::new`,
      arguments: [tx.pure.string(text.trim())]
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log('Transaction successful:', result)
          setIsLoading(false)
          // Refresh greetings after creation - wait longer for indexing
          setTimeout(() => {
            console.log('Refreshing greetings after creation...')
            fetchMyGreetings()
            fetchSharedGreetings()
          }, 3000)
        },
        onError: (error) => {
          console.error('Transaction failed:', error)
          setError('Failed to create on-chain greeting')
          setIsLoading(false)
        }
      }
    )
  }

  const updateOnChainGreeting = async (objectId: string, newText: string) => {
    if (!account || !newText.trim()) return

    setIsLoading(true)
    setError(undefined)

    const tx = new Transaction()
    tx.moveCall({
      target: `${config.sui.packageId}::greeting::update_text`,
      arguments: [
        tx.object(objectId),
        tx.pure.string(newText.trim())
      ]
    })

    signAndExecute(
      { transaction: tx },
      {
        onSuccess: (result) => {
          console.log('Update successful:', result)
          setIsLoading(false)
          // Refresh greetings after update
          setTimeout(() => {
            console.log('Refreshing greetings after update...')
            fetchMyGreetings()
            fetchSharedGreetings()
          }, 3000)
        },
        onError: (error) => {
          console.error('Update failed:', error)
          setError('Failed to update greeting')
          setIsLoading(false)
        }
      }
    )
  }

  return {
    greetings,
    onChainGreetings, // All greetings (for Global tab)
    myOnChainGreetings, // Only user's greetings (for Private tab)
    isLoading,
    error,
    account,
    addLocalGreeting,
    createOnChainGreeting,
    updateOnChainGreeting,
    refreshGreetings: fetchSharedGreetings,
    refreshMyGreetings: fetchMyGreetings,
  }
}