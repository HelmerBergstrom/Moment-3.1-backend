# Moment 3 - Backend-baserad Webbutveckling

## CV i form av erfarenheter

Detta projekt är ett API för att hantera data kring erfarenheter - framförallt jobberfarenheter.
I API:et finns det stöd för att lagra:

- Företagets namn/arbetsgivarens namn
- Arbetsuppgifter
- Vart arbetet utfördes
- Hur länge användaren arbetade/har arbetat där

## Paket och liknande

- MongoDB med Mongoose
- Express
- CORS
- Node.js

## Installation

1. Klona detta repo till din dator via terminalen:
```bash
git clone https://github.com/HelmerBergstrm/moment-3.1-backend.git
```
2. Gå till mappen.

3. Installera paket osv med npm install.

4. Starta MongoDB-servern.

5. Starta applikationen via:
```bash
node server.js
```

## Användning av API:et

#### GET /workexperience

Med detta hämtar du alla erfarenheter som finns lagrade i databasen. Finns det lagrade erfarenheter kommer de att returneras i JSON-format likt nedan:

```bash
[
  {
    "_id": "ObjectID("")",
    "companyname": "Företagets/arbetsgivarens namn",
    "task": "Arbetsuppgiften",
    "city": "Staden där användaren jobbade/jobbar",
    "howlongY": 2,
    "howlongM": 6
  }
]
```

howlongY och howlongM = ÅR och MÅNADER

#### POST /workexperience

Lägger till en erfarenhet.

#### PUT /workexperience/:id

Uppdaterar en befintlig erfarenhet med hjälp av ID.

#### DELETE /workexperience/:id

Raderar en befintlig erfarenhet med hjälp av ID.
