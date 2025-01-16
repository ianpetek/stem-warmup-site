"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FloatingCircles from "@/app/components/FloatingCircles"
import Navbar from "@/app/components/Navbar"
import { VerdictDisplay } from "@/components/VerdictDisplay"
import React, { useState, useEffect } from 'react'

const DAY = 1;

interface FormDataType {
  day: number;
  language: string;
  code: string;
}

interface VerdictData {
  id: string;
  user_id: string;
  problem_id: string;
  language: string;
  created_at: string;
  time_used_millis: number;
  memory_used_megabytes: number;
  verdict: string;
  awarded_score: number;
  completed: boolean;
}




export default function ProgramiranjeDay() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<VerdictData | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const formObject: FormDataType = { day: DAY, language: '', code: '' };

      formData.forEach((value, key) => {
        if (key === 'language') {
          formObject.language = value as string;
          // if value <empty string>
          if (!value) {
            throw new Error('Please select a language');
          }
        }
        if (key === 'code') {
          formObject.code = value as string;
        }
      });
      setIsLoading(true)
      setEvaluating(true);
      setData(undefined)

      const response = await fetch('/api/submit-solution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  // Function to fetch the data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('/api/getVerdict/' + String(DAY));
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const response_json = await response.json()
      if (Object.keys(response_json).length === 0) {
        return
      }

      const result: VerdictData = response_json;


      // Validate that `completed` is true
      if (!result.completed) {
        setData(undefined);
        setEvaluating(true);
        return null;
      }

      setData(result);
      setEvaluating(false);
      setIsLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  // Auto-fetch data when the component mounts and refresh every 5 seconds
  useEffect(() => {
    if (!isLoading || !evaluating) {
      fetchData();
    }
    const interval = setInterval(fetchData, 1000); // Update every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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

          <form className="space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                Odaberite Programski Jezik
              </label>
              <Select name="language">
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
                name="code"
                placeholder="Ovdje unesite vaš kod..."
                className="min-h-[300px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || evaluating}> {(isLoading || evaluating) ? 'Evaluating...' : 'Predaj Rješenje'}</Button>
          </form>
          <div className="mt-8">
          <VerdictDisplay data={data} error={error} evaluating={evaluating} />
          </div>
        </div>
      </div>
    </div>
  )
}

