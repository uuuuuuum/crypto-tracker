const BASE_URL = `https://api.coinpaprika.com/v1`;
export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then(response => response.json());
}

export async function fetchCoinInfo(coinId:string|undefined) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export async function fetchCoinTickers(coinId:string|undefined) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}

export async function fetcherCoinHistory(coinId:string|undefined) {
    /* Rest api 방식으로 start date와 end date를 url 뒤에 삽입해줘야 함 */
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json());
}