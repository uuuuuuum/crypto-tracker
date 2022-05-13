import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const PriceWrapper = styled.ul`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border-radius: 8px;
`;
const PriceBox = styled.li`
    display: flex;
    flex-direction: column;
    padding: 14px;
    width: 50%;
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.boxColor};
    overflow: hidden;

    &:nth-child(1) {
        width: 100%;
    }

    span:nth-child(1) {
        font-size: 13px;
    }
    span:nth-child(2) {
        font-size: 28px;
        margin-top: 8px;
        font-weight: bold;
        letter-spacing: -1px;
        word-break: break-word;

        span { font-size: 16px }
    }
`;

interface PriceProps {
    priceData: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
    }
}

function Price() {
    const { priceData } = useOutletContext<PriceProps>();

    return (
        <PriceWrapper>
            <PriceBox>
                <span>Price Now</span>
                <span>{priceData.price.toFixed(2)}</span>
            </PriceBox>
            <PriceBox>
                <span>change 15mins</span>
                <span>
                    {priceData.percent_change_15m}    
                    <span> %</span>
                </span>
            </PriceBox>
            <PriceBox>
                <span>change 1hour</span>
                <span>
                    {priceData.percent_change_1h}
                    <span> %</span>
                </span>
            </PriceBox>
            <PriceBox>
                <span>change 6horus</span>
                <span>
                    {priceData.percent_change_6h}
                    <span> %</span>
                </span>
            </PriceBox>
            <PriceBox>
                <span>change 7days</span>
                <span>
                    {priceData.percent_change_7d}
                    <span> %</span>
                </span>
            </PriceBox>
            <PriceBox>
                <span>All TIme High Date</span>
                <span>{priceData.ath_date.slice(0, 10)}</span>
            </PriceBox>
            <PriceBox>
                <span>All TIme High Price</span>
                <span>{priceData.ath_price.toFixed(2)}</span>
            </PriceBox>
        </PriceWrapper>
    )
}

export default Price;