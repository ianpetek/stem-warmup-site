import Image from 'next/image'

export default function OrganizersSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Partneri</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-16">
          <div className="text-center">
            <Image 
              src="/xfer-logo.png" 
              alt="XFer Logo" 
              width={200} 
              height={200} 
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">XFer</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

