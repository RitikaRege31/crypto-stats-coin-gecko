# crypto-stats
 
## Please follow below steps to run the code:

1. Clone the Repo to your machine using the command `git clone https://github.com/RitikaRege31/crypto-stats-coin-gecko.git`.
2. Install the dependencies using the command `npm install`.
3. Please make a new `.env` file for the environment variables.
   Add `MONGO_URI=<Your MongoDB URI>`.
   Add `PORT=5000`.
4. After adding the environment variables, run the application using `npm run dev`.
5. Access the application at [http://localhost:5000](http://localhost:5000).

    Task 2 Request Route: `http://localhost:5000/api/stats?coin=bitcoin`
    Change the bitcoin in the url to ethereum or matic-network to obtain the stats for them respectively

    Task 2 Request Route: `http://localhost:5000/api/deviation?coin=bitcoin`
    Change the bitcoin in the url to ethereum or matic-network to obtain the stats for them respectively
