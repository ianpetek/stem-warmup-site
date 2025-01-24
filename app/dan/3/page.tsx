"use client"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import FloatingCircles from "@/app/components/FloatingCircles"
import Navbar from "@/app/components/Navbar"
import { VerdictDisplay } from "@/components/VerdictDisplay"
import React, { useState, useEffect } from 'react'
import MarkdownRenderer from "@/app/components/MarkdownRenderer"
import { CategoryScoresDisplay } from "@/components/CategoryScoresDisplay"

const DAY = 3;
const markdownContent =
    `
Potrebne datoteke nalaze se na gumbima ispod

## Pwn
Stvari u IT-u su bolje sa slovom S, HTTPS > HTTP, SFTP > FTP, mislim da je vrijeme da naučimo i bolju verziju ROP-a
\`\`\`
nc 174.138.101.72 1338
\`\`\`

## Crypto
Jesmo li upravo razbili sha256?
\`\`\`
nc 174.138.101.72 1337
\`\`\`


## Web
Postoje tri vrste laži: laži, proklete laži i komentari
\`\`\`
nc 174.138.101.72:1339
\`\`\`
`;

export default function ProgramiranjeDay() {
    const handleDownload = async (slug: string): Promise<void> => {
        try {
            const res = await fetch(`/api/download/${slug}`);

            if (!res.ok) {
                alert('Failed to download the file.');
                return;
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${slug}.zip`; // Name of the file when downloaded
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
            alert('An unexpected error occurred.');
        }
    };


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.target as HTMLFormElement);
            const problem = formData.get('language') as string;
            const flag = formData.get('code') as string;
            const response = await fetch('/api/ctf/' + problem, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ flag: flag }),
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            await new Promise(r => setTimeout(r, 1000));
            setIsLoading(false);
        }
    };

    const [data, setData] = useState<{
        web: { user: string; slug: string; points: number } | null;
        pwn: { user: string; slug: string; points: number } | null;
        crypto: { user: string; slug: string; points: number } | null;
      }>({
        web: null,
        pwn: null,
        crypto: null,
      });
      
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const fetchData = async () => {
        try {
            const categories = ['web', 'pwn', 'crypto'] as const;
            const results = await Promise.all(
                categories.map(async (category) => {
                    const res = await fetch(`/api/ctf/${category}`);
                    if (!res.ok) {
                        throw new Error(`Failed to fetch data for ${category}`);
                    }
                    return { category, data: await res.json() };
                })
            );

            const structuredData = results.reduce((acc, { category, data }) => {
                acc[category] = data;
                return acc;
            }, {} as typeof data);

            setData(structuredData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
            <FloatingCircles />
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl relative z-10 max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-center">Dan 3: CTF</h1>
                    <h3 className="text-2xl text-red-600 font-bold mb-6 text-center">VAŽNO: NE MOŽE SE PRISTUPITI SERVISIMA PREKO EDUORAM MREŽE</h3>

                    <section className="mb-8">
                        <MarkdownRenderer content={markdownContent} />
                    </section>
                    <button
                        onClick={() => handleDownload('web')}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-4 mb-4"
                    >
                        Download Web.zip
                    </button>
                    <button
                        onClick={() => handleDownload('pwn')}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-4 mb-4"
                    >
                        Download Pwn.zip
                    </button>
                    <button
                        onClick={() => handleDownload('crypto')}
                        className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mr-4 mb-4"
                    >
                        Download Crypto.zip
                    </button>

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                                Odaberite Programski Jezik
                            </label>
                            <Select name="language">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Odaberite zadatak" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">web</SelectItem>
                                    <SelectItem value="pwn">pwn</SelectItem>
                                    <SelectItem value="crypto">crypto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                                Unesite flag
                            </label>
                            <Textarea
                                id="code"
                                name="code"
                                placeholder="SUSFER{...}"
                                className="min-h-[50px]"
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}> {(isLoading) ? 'Evaluating...' : 'Predaj Rješenje'}</Button>
                    </form>
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg font-semibold text-gray-700">Web Points:</span>
    <pre className="text-xl font-mono text-green-600">{data.web?.points ?? "0"}</pre>
  </div>
  <div className="flex justify-between items-center mb-4">
    <span className="text-lg font-semibold text-gray-700">PWN Points:</span>
    <pre className="text-xl font-mono text-blue-600">{data.pwn?.points ?? "0"}</pre>
  </div>
  <div className="flex justify-between items-center">
    <span className="text-lg font-semibold text-gray-700">Crypto Points:</span>
    <pre className="text-xl font-mono text-yellow-600">{data.crypto?.points ?? "0"}</pre>
  </div>
</div>

                </div>
            </div>
        </div>
    )
}

