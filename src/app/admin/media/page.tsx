'use client'

import AdminLayout from '@/components/AdminLayout'
import { PhotoIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'

export default function MediaPage() {
  return (
    <AdminLayout>
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your website's images and files</p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Upload files</h3>
            <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Choose files
              </button>
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Uploads</h3>
            
            {/* Empty State */}
            <div className="text-center py-12">
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No media files</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading your first file.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}