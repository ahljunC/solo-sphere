'use client'

<<<<<<< HEAD
import { DashboardLayout } from '@/components/layouts/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function DashboardPage() {
  const { user } = useAuth()

  // Dashboard content component to render inside ProtectedRoute
  const DashboardContent = () => (
    <DashboardLayout title="Dashboard">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader 
            title="Welcome to SoloSphere!" 
            description="Your all-in-one freelance business management platform"
          />
          <CardContent>
            <div className="mb-4">
              <p className="text-gray-600">You are signed in as:</p>
              <p className="font-medium">{user?.email || 'No email available'}</p>
            </div>
          </CardContent>
          <CardFooter>
            <h3 className="text-sm font-medium mb-2">Account Details</h3>
            <div className="text-sm text-gray-600">
              <p>User ID: {user?.id || 'Not available'}</p>
              <p>
                Last Sign In: {
                  user?.last_sign_in_at 
                    ? new Date(user.last_sign_in_at).toLocaleString() 
                    : 'N/A'
                }
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  )

  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
=======
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      try {
        const user = await getUser()
        if (!user) {
          router.replace('/auth/login')
          return
        }
        setUser(user)
      } catch (error) {
        console.error('Error loading user:', error)
        router.replace('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router])

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome to SoloSphere!</h2>
          <div className="mb-6">
            <p className="text-gray-600">You are signed in as:</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-lg font-medium mb-2">Account Details</h3>
            <div className="text-sm text-gray-600">
              <p>User ID: {user?.id}</p>
              <p>Last Sign In: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
>>>>>>> 9ca1f57 (Resolve merge conflicts between feature-login/registration and main)
  )
}