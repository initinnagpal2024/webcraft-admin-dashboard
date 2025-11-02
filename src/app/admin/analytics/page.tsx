'use client'

import AdminLayout from '@/components/AdminLayout'
import { 
  ChartBarIcon, 
  EyeIcon, 
  UserGroupIcon, 
  CursorArrowRaysIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline'

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your website performance and visitor insights</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <EyeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-semibold text-gray-900">12,453</p>
                <div className="flex items-center mt-1">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-semibold text-gray-900">8,242</p>
                <div className="flex items-center mt-1">
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8.2%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CursorArrowRaysIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-semibold text-gray-900">3.4%</p>
                <div className="flex items-center mt-1">
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-semibold text-gray-900">42.8%</p>
                <div className="flex items-center mt-1">
                  <ArrowDownIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">-5.3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Traffic Chart */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Traffic Overview</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Analytics Chart</h3>
                  <p className="mt-1 text-sm text-gray-500">Traffic data visualization would appear here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Top Pages</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">/</p>
                    <p className="text-sm text-gray-500">Homepage</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">5,432</p>
                    <p className="text-sm text-gray-500">views</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">/buy-websites</p>
                    <p className="text-sm text-gray-500">Products page</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">2,145</p>
                    <p className="text-sm text-gray-500">views</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">/about</p>
                    <p className="text-sm text-gray-500">About page</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">1,823</p>
                    <p className="text-sm text-gray-500">views</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">/contact</p>
                    <p className="text-sm text-gray-500">Contact page</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">967</p>
                    <p className="text-sm text-gray-500">views</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Traffic Sources</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Direct</span>
                  </div>
                  <span className="text-sm text-gray-500">45.2%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Google Search</span>
                  </div>
                  <span className="text-sm text-gray-500">32.1%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Social Media</span>
                  </div>
                  <span className="text-sm text-gray-500">12.8%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Referrals</span>
                  </div>
                  <span className="text-sm text-gray-500">9.9%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">New visitor from Mumbai</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">Product page viewed</p>
                  <p className="text-xs text-gray-500">5 minutes ago</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">Contact form submitted</p>
                  <p className="text-xs text-gray-500">12 minutes ago</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <p className="text-sm font-medium text-gray-900">Newsletter signup</p>
                  <p className="text-xs text-gray-500">18 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Analytics Integration</h3>
              <p className="text-sm text-blue-700 mt-1">
                Connect Google Analytics, Cloudflare Analytics, or other tracking services to get real data. 
                The data shown above is for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}