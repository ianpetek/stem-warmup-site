"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface Player {
  ime_prezime?: string; // Full name of the player, optional
  jmbag?: string; // Optional field for player identifier
}

interface User {
  user_id: string;
  username: string;
  user_metadata: {
    player1?: Player;
    player2?: Player;
    player3?: Player;
  };
}

export default function PrijavljeniPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const options: AxiosRequestConfig = {
        method: "GET",
        url: "/api/getUsers",
      };

      try {
        const response: AxiosResponse<User[]> = await axios.request(options);
        setUsers(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Prijavljeni</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!users ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th style={{ padding: "10px" }}>Index</th>
              <th style={{ padding: "10px" }}>imeTima</th>
              <th style={{ padding: "10px" }}>Name1</th>
              <th style={{ padding: "10px" }}>JMBAG1</th>
              <th style={{ padding: "10px" }}>Name2</th>
              <th style={{ padding: "10px" }}>JMBAG2</th>
              <th style={{ padding: "10px" }}>Name3</th>
              <th style={{ padding: "10px" }}>JMBAG3</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const player1 = user.user_metadata.player1;
              const player2 = user.user_metadata.player2;
              const player3 = user.user_metadata.player3;

              // Extract name and JMBAG for player 1
              const player1Name = player1?.ime_prezime ?? "N/A";
              const player1JMBAG = player1?.jmbag ?? "N/A";

              // Extract name and JMBAG for player 2
              const player2Name = player2?.ime_prezime ?? "N/A";
              const player2JMBAG = player2?.jmbag ?? "N/A";

              // Extract name and JMBAG for player 3
              const player3Name = player3?.ime_prezime ?? "N/A";
              const player3JMBAG = player3?.jmbag ?? "N/A";

              return (
                <tr key={user.user_id}>
                  <td>{index + 1}</td> {/* Index of the user (1-based) */}
                  <td>{user.username}</td> {/* Username */}
                  <td>{player1Name}</td> {/* Player 1 Name */}
                  <td>{player1JMBAG}</td> {/* Player 1 JMBAG */}
                  <td>{player2Name}</td> {/* Player 2 Name */}
                  <td>{player2JMBAG}</td> {/* Player 2 JMBAG */}
                  <td>{player3Name}</td> {/* Player 3 Name */}
                  <td>{player3JMBAG}</td> {/* Player 3 JMBAG */}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
