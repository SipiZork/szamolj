import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [februarKereset, setFebruarKereset] = useState('');
  const [februarKm, setFebruarKm] = useState('');
  const [februarKiszallitasok, setFebruarKiszallitasok] = useState('');
  const [marciusKereset, setMarciusKereset] = useState('');
  const [marciusKm, setMarciusKm] = useState('');
  const [marciusKiszallitasok, setMarciusKiszallitasok] = useState('');
  const [eredmenyek, setEredmenyek] = useState(null);
  const [uzenet, setUzenet] = useState(null);

  const szamitas = () => {
    const februarEredmenyek = {
      atlagCimpenz: (februarKereset / februarKiszallitasok) || 0,
      atlagKm: (februarKm / februarKiszallitasok) || 0
    };

    const marciusEredmenyek = {
      atlagCimpenz: (marciusKereset / marciusKiszallitasok) || 0,
      atlagKm: (marciusKm / marciusKiszallitasok) || 0
    };

    setEredmenyek({ februar: februarEredmenyek, marcius: marciusEredmenyek });

    // Összehasonlítás és üzenet beállítása
    if (marciusEredmenyek.atlagCimpenz > februarEredmenyek.atlagCimpenz) {
      setUzenet({
        tipus: 'siker',
        szoveg: 'Gratulálunk! Remekül halad a vállalkozás, az átlag címpénz növekedett!'
      });
    } else if (marciusEredmenyek.atlagCimpenz < februarEredmenyek.atlagCimpenz) {
      setUzenet({
        tipus: 'email',
        szoveg: `
Tisztelt Wolt Ügyfélszolgálat!

Futárként fordulok Önökhöz, hogy felhívjam a figyelmet a februári és márciusi hónap során tapasztalt jelentős változásokra a címpénzek és a megtett távolságok tekintetében. Az elmúlt időszakban egyértelmű tendencia figyelhető meg:

A címpénzek csökkenése
Az egy fuvarra jutó kilométerszám növekedése
A megélhetési és lakhatási költségek folyamatos emelkedése

A következő adatokkal szeretném alátámasztani a fentieket:

Február átlagos adatai:
Átlagos címpénz: ${februarEredmenyek.atlagCimpenz.toFixed(0)} Ft
Átlagosan megtett távolság rendelésenként: ${februarEredmenyek.atlagKm.toFixed(2)} km

Március átlagos adatai:
Átlagos címpénz: ${marciusEredmenyek.atlagCimpenz.toFixed(0)} Ft
Átlagosan megtett távolság rendelésenként: ${marciusEredmenyek.atlagKm.toFixed(2)} km

Egyre nehezebb a futároknak fenntartani a stabil jövedelmet, miközben a költségek (üzemanyag, járműfenntartás, lakhatás stb.) folyamatosan nőnek. Ez nemcsak az egyéni futárok megélhetését nehezíti meg, hanem hosszú távon a szolgáltatás minőségére is negatív hatással lehet.

Kérem, hogy vizsgálják felül a tarifarendszert és fontolják meg a futárok számára kedvezőbb feltételek bevezetését. Sokan közülünk a Woltra támaszkodnak fő vagy kiegészítő bevételi forrásként, ezért fontos lenne, hogy a változások ne rontsák a munkánk anyagi megbecsülését.

Várom visszajelzésüket a fenti problémák kapcsán.

Üdvözlettel,
[Név]

`
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Átlag címpénz Kalkulátor</h1>
        <div className="input-container">
          <div className="months-container">
            <div className="month-column">
              <h2>Első hónap</h2>
              <div className="input-group">
                <label htmlFor="februar-kereset">Kereset (borravaló és bónuszok nélkül):</label>
                <input
                  type="number"
                  id="februar-kereset"
                  value={februarKereset}
                  onChange={(e) => setFebruarKereset(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="februar-km">Kilométer (app szerinti):</label>
                <input
                  type="number"
                  id="februar-km"
                  value={februarKm}
                  onChange={(e) => setFebruarKm(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="februar-kiszallitasok">Kiszállítások száma:</label>
                <input
                  type="number"
                  id="februar-kiszallitasok"
                  value={februarKiszallitasok}
                  onChange={(e) => setFebruarKiszallitasok(e.target.value)}
                />
              </div>
            </div>

            <div className="month-column">
              <h2>Második hónap</h2>
              <div className="input-group">
                <label htmlFor="marcius-kereset">Kereset (borravaló nélkül):</label>
                <input
                  type="number"
                  id="marcius-kereset"
                  value={marciusKereset}
                  onChange={(e) => setMarciusKereset(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="marcius-km">Kilométer (appszerint):</label>
                <input
                  type="number"
                  id="marcius-km"
                  value={marciusKm}
                  onChange={(e) => setMarciusKm(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="marcius-kiszallitasok">Kiszállítások száma:</label>
                <input
                  type="number"
                  id="marcius-kiszallitasok"
                  value={marciusKiszallitasok}
                  onChange={(e) => setMarciusKiszallitasok(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="calculate-button" onClick={szamitas}>
            Számítás
          </button>

          {eredmenyek && (
            <div className="results-container">
              <div className="month-column">
                <h3>Február eredmények:</h3>
                <p>Átlag címpénz: {eredmenyek.februar.atlagCimpenz.toFixed(0)} Ft/cím</p>
                <p>Átlag kilométer: {eredmenyek.februar.atlagKm.toFixed(1)} km/cím</p>
              </div>
              <div className="month-column">
                <h3>Március eredmények:</h3>
                <p>Átlag címpénz: {eredmenyek.marcius.atlagCimpenz.toFixed(0)} Ft/cím</p>
                <p>Átlag kilométer: {eredmenyek.marcius.atlagKm.toFixed(1)} km/cím</p>
              </div>
            </div>
          )}

          {/*uzenet && (
            <div className={`uzenet-container ${uzenet.tipus}`}>
              <h3>{uzenet.tipus === 'email' ? 'Ha szeretnéd te is megérdeklődni a Wolt vezetőségéről, hogy mire számíthatsz, egy Javasolt email sablon:' : 'Gratulálunk, te valamit nagyon jól csinálhatsz. Az átlagos címpénzeid nőttek az előző hónaphoz képest!'}</h3>
              <pre>{uzenet.szoveg}</pre>
            </div>
          )*/}
        </div>
      </header>
    </div>
  );
}

export default App;
