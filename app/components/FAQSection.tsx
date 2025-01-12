'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
  {
    question: "Kako se mogu prijaviti za natjecanje?",
    answer: "Možete se prijaviti klikom na gumb 'Prijavi se' u navigacijskoj traci. Ispunite obrazac s vašim podacima i bit ćete registrirani za natjecanje."
  },
  {
    question: "Koje vještine su potrebne za sudjelovanje?",
    answer: "Natjecanje pokriva različite STEM vještine, uključujući programiranje, matematiku i sigurnost (CTF). Osnovno znanje iz ovih područja je korisno, ali natjecanje je otvoreno za sve razine znanja."
  },
  {
    question: "Kako funkcionira bodovanje?",
    answer: "Bodovi se dodjeljuju za svaki dan natjecanja na temelju vaših performansi u zadacima. Ukupni bodovi određuju vaš položaj na rang listi."
  },
  {
    question: "Mogu li sudjelovati ako propustim jedan dan?",
    answer: "Da, možete sudjelovati čak i ako propustite jedan dan. Međutim, za najbolje rezultate preporučujemo sudjelovanje u svim danima natjecanja."
  }
]

export default function FAQSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Često Postavljena Pitanja</h2>
        <Accordion type="single" collapsible>
          {faqData.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

