import Image from 'next/image'

export default function LandingSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 150 + 50; // Size between 50px and 200px
          return (
            <div
              key={i}
              className={`absolute rounded-full mix-blend-screen filter blur-sm opacity-50 animate-float-${i % 4 + 1}`}
              style={{
                backgroundColor: ['#0d4e96', '#2ba7de', '#f15c22', '#a9cf38'][i % 4],
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            ></div>
          );
        })}
      </div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">STEM ZNANJE WARMUP</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
        Dobrodošli na 5-dnevno zimsko zagrijavanje za STEM Games. Svaki dan druga kategorija, pa složite svoj tim i pokažite svoje znanje.
        Očekuju vas novi i zanimljivi zadatci iz svih kategorija, a najbolji će osvojiti vrijedne nagrade.
        </p>
        <div className="mb-8">
        <Image 
              src="/susfer-logo.png" 
              alt="SUSFER Logo" 
              width={300} 
              height={300} 
              className="mx-auto mb-4"
            />
        </div>
      </div>
    </div>
  )
}