'use client'

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { 
  ShoppingBagIcon, 
  DocumentTextIcon,
  UsersIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'

const ADMIN_EMAIL = 'initinnagpal2024@gmail.com'

function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <ShoppingBagIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-2xl font-semibold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <DocumentTextIcon className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Content Pages</p>
            <p className="text-2xl font-semibold text-gray-900">0</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <UsersIcon className="h-6 w-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Users</p>
            <p className="text-2xl font-semibold text-gray-900">1</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-orange-100 rounded-lg">
            <PhotoIcon className="h-6 w-6 text-orange-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Media Files</p>
            <p className="text-2xl font-semibold text-gray-900">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <a href="/admin/products" className="block w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-md text-blue-700 font-medium">
            + Add New Product
          </a>
          <a href="/admin/content" className="block w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-md text-green-700 font-medium">
            + Create Content
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="text-sm text-gray-500">
          <p>No recent activity</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Website Status</h3>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Online</span>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (!user) {
    router.push('/sign-in')
    return null
  }

  const userEmail = user.emailAddresses[0]?.emailAddress

  if (userEmail !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-700">Only authorized administrators can access this dashboard.</p>
          <p className="text-sm text-red-600 mt-2">Email: {userEmail}</p>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
        </div>

        <DashboardStats />
        <QuickActions />
      </div>
    </AdminLayout>
  )
}