import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FloatingCircles from "@/app/components/FloatingCircles"
import Navbar from "@/app/components/Navbar"

export default function ProgramiranjeDay() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <FloatingCircles />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl relative z-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Dan 1: Programiranje</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Opis Zadatka</h2>
            <p className="text-gray-700">
              Dobrodošli na prvi dan STEM ZNANJE WARMUP natjecanja! Današnji zadatak testira vaše vještine programiranja.
              Potrebno je implementirati algoritam za sortiranje niza brojeva koristeći metodu "bubble sort".
              Vaš kod treba primiti niz cijelih brojeva kao ulaz, sortirati ga u uzlaznom redoslijedu, i vratiti sortirani niz.
            </p>
          </section>

          <form className="space-y-6">
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Odaberite Programski Jezik
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Odaberite jezik" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="c">C</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Vaš Kod
              </label>
              <Textarea
                id="code"
                placeholder="Ovdje unesite vaš kod..."
                className="min-h-[300px]"
              />
            </div>

            <Button type="submit" className="w-full">Predaj Rješenje</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

