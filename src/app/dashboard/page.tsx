'use client'

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
  )
}