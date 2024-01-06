// Page.tsx

import React, { useState, useMemo } from "react";
import Head from "next/head";
import { BarChart } from "../../components/immobiliere/Diagramme_a_barre";
import Navbar from "../../components/immobiliere/Navbar";

const Page = () => {
  const [periode, setPeriode] = useState("mois");
  const [dateDebut, setDateDebut] = useState("2018-03-04");
  const [dateFin, setDateFin] = useState("");

  const data = [
    { date: "2017-01-01", sales: 20 },
    { date: "2017-01-02", sales: 30 },
    { date: "2017-01-03", sales: 60 },
    { date: "2017-01-04", sales: 10 },
    { date: "2017-01-20", sales: 110 },
    { date: "2017-02-01", sales: 30 },
    { date: "2017-03-01", sales: 40 },
    { date: "2017-04-01", sales: 60 },
    { date: "2017-05-01", sales: 80 },
    { date: "2017-06-01", sales: 100 },
    { date: "2017-07-01", sales: 200 },
    { date: "2017-08-01", sales: 50 },
    { date: "2017-09-01", sales: 100 },
    { date: "2017-10-01", sales: 200 },
    { date: "2017-11-01", sales: 100 },
    { date: "2017-12-01", sales: 180 },
    { date: "2018-01-01", sales: 120 },
    { date: "2018-02-01", sales: 40 },
    { date: "2018-02-02", sales: 40 },
    { date: "2018-03-08", sales: 100 },
    { date: "2018-03-04", sales: 230 },
    { date: "2018-04-04", sales: 230 },

  ];

  const filteredData = useMemo(() => {
    return data.filter((d) => {
      const date = new Date(d.date);
      const debut = dateDebut
        ? new Date(dateDebut)
        : new Date(-8640000000000000);
      const fin = dateFin ? new Date(dateFin) : new Date(8640000000000000);
      return date >= debut && date <= fin;
    });
  }, [data, dateDebut, dateFin]);

  return (
    <div>
      <Head>
        <title>Diagramme à barre</title>
        <style>
          {`
         
            .page-container {
              font-family: 'Arial', sans-serif;
              background: white; /* Light gray background */
            }
            
            .form-container {
              margin: 30px;
              background: white;
              padding: 20px;
              border-radius: 15px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
              margin-bottom: 20px;
              margin-left: 20vw;
              margin-right: 20vw;
            }
            
            
            .chart-form {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            }
            
            .form-group {
              margin: 10px;
              display: flex;
              flex-direction: column;
            }
            
            .form-group label {
              margin-bottom: 5px;
              font-weight: bold;
              color: #555;
            }
            
            .form-group input,
            .form-group select {
              padding: 10px;
              border-radius: 4px;
              border: 1px solid #ddd;
              font-size: 16px;
            }
            
            .form-group input[type="date"] {
              cursor: pointer;
            }
            
            .form-group select {
              cursor: pointer;
              background: white;
            }

           
            /* Styling for date input */
            input[type="date"] {
              padding: 10px 15px;
              border-radius: 30px; /* Rounded borders */
              border: 2px solid #007bff; /* Blue border */
              font-size: 16px;
              color: #333;
              background-color: white;
              cursor: pointer;
              outline: none; /* Remove default focus outline */
              transition: all 0.3s ease-in-out; /* Smooth transition for interactions */
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
            }
      
            /* Hover effect */
            input[type="date"]:hover {
              background-color: #f0f0f0; /* Slight change in background color */
              transform: translateY(-2px); /* Slightly raise the input */
              box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1); /* Increase shadow */
            }
      
            /* Focus effect */
            input[type="date"]:focus {
              border-color: #0056b3; /* Darker blue border */
              box-shadow: 0 0 0 0.2rem rgba(0, 86, 179, 0.25); /* Blue glow */
            }
      
            /* Label styling */
            label {
              display: block; /* Ensure it takes its own line */
              margin-bottom: 5px; /* Space between label and input */
              color: #333; /* Matching text color */
              font-weight: bold; /* Make it bold */
            }
      
        
          `}
        </style>

      </Head>
      <Navbar />
      <div className="page-container">
        <div className="form-container">
          <form className="chart-form">
            <label htmlFor="periode">Période :</label>
            <select
              id="periode"
              value={periode}
              onChange={(e) => setPeriode(e.target.value)}
            >
              <option value="jour">Par Jour</option>
              <option value="mois">Par Mois</option>
              <option value="annee">Par Année</option>
            </select>
            <label htmlFor="dateDebut">Date de début :</label>
            <input
              type="date"
              id="dateDebut"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
            <label htmlFor="dateFin">Date de fin :</label>
            <input
              type="date"
              id="dateFin"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </form>

        </div>
        <BarChart data={filteredData} periode={periode} />
      </div>
    </div>
  );
};

export default Page;
