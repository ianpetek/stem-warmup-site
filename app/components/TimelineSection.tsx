import Link from 'next/link'
import { Button } from "@/components/ui/button"

// Timeline data
const timelineData = [
  { day: 'Ponedjeljak', date: '2025-01-20', topic: 'Programiranje', slug: '1' },
  { day: 'Utorak', date: '2025-01-21', topic: 'Optimizacija', slug: '2' },
  { day: 'Srijeda', date: '2025-01-22', topic: 'CTF', slug: '3' },
  { day: 'Četvrtak', date: '2025-01-23', topic: 'Matematika: Back to Basics', slug: '4' },
  { day: 'Petak', date: '2025-01-24', topic: 'Matematika & Programiranje Crossover', slug: '5' },
]

export default function TimelineSection() {
  const today = new Date(); // Current date

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Raspored Natjecanja</h2>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 border-r-2 border-blue-300 h-full"></div>
          {timelineData.map((item, index) => {
            const eventDate = new Date(item.date); // Convert event date
            const isAvailable = today >= eventDate; // Check if the date has arrived

            return (
              <div key={index} className="mb-8 flex flex-col md:flex-row md:justify-between items-start md:items-center">
                <div className="flex items-center md:w-5/12 md:justify-end">
                  <div className="md:hidden w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10 mr-4">
                    {index + 1}
                  </div>
                  <div className="md:text-right">
                    <h3 className="font-bold text-lg">{item.day}</h3>
                    <p className="text-gray-600">{new Intl.DateTimeFormat('hr-HR', { day: '2-digit', month: '2-digit' }).format(new Date(item.date))}</p>
                    <p className="text-gray-800">{item.topic}</p>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold z-10">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-12 md:ml-0 md:w-5/12 mt-4 md:mt-0">
                  {isAvailable ? (
                    <Button asChild>
                      <Link href={`/dan/${item.slug}`}>Idi na stranicu</Link>
                    </Button>
                  ) : (
                    <Button 
                      className="opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Još nedostupno
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
