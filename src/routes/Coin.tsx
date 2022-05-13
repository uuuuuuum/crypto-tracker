import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled, { keyframes } from "styled-components"
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { BtnTheme } from "../App";
import ico_back from "../images/ico_back.svg";
import ico_back_w from "../images/ico_back_w.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 0;
    font-weight: 600;

    div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        width: 100%
    }
    button:nth-child(1) {
        order: 2;
        grid-column: 2 / 3;
        justify-self: flex-end;
    }
    button:nth-child(2) {
        order: 1;
        grid-column: 1 / 2;
        justify-self: flex-start;
    }
`;

const BtnGoBack = styled.button<{ isDark:boolean }>`
    display: flex;
    align-items: center;
    padding: 4px;
    font-size: 12px;
    background-color: ${(props) => props.isDark ? props.theme.boxColor : "#fffdfa" };
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    img {
        width: 20px;
        height: 20px;
    }
`;
const Title = styled.h1`
    font-size: 40px;
    color: ${props => props.theme.accentColor};  
`;
const Loader = styled.span`
  text-align  : center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    background-color: ${(props) => props.theme.boxColor};
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;

const Description = styled.div`
    margin: 20px 0;
    line-height: 21px;
    letter-spacing: -0.5px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 25px 0;
`;
const Tab = styled.div<{ isActive: boolean }>`
    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;

    a {
        display: block;
        padding: 10px 0px;
        background-color: ${(props) => props.theme.boxColor};
        border-radius: 10px;
        transition: opacity 0.14s ease-in, border-radius 0.14s ease-in;

        &:hover {
            opacity: 0.8;
        }
    }
    &:nth-child(1) > a {
        border-radius: ${(props) => props.isActive ? "10px 10px 0 0" : "10px" };
    }
`;

const BtnChartAnima = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const BtnChart = styled.button<{ isLineChart: boolean }>`
    width: calc(100% / 2);
    padding: 6px 0;
    color: white;
    font-size: 0.9em;
    background-color: ${ (props) => props.isLineChart ? props.theme.accentColor : props.theme.innerTabColor };
    border: 0;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    animation: ${BtnChartAnima} 0.5s;

    &:hover {
        opacity: 0.8;
    }
`;

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
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
    };
}

interface ICoinProps {
    toggleDark: () => void;
    isDark: boolean;
}

function Coin({ toggleDark, isDark }:ICoinProps) {
    const { coinId } = useParams();
    const location = useLocation();
    const state = location.state as RouteState;
    
    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {
        refetchInterval:  5000,
    });

    const loading = infoLoading || tickersLoading;

    const chartMatch = useMatch("/:coinId/chart");
    const priceMatch = useMatch("/:coinId/price");

    const [ isLineChart, SetIsLineChart ] = useState(true);
    const LineChart = () => isLineChart ? null : SetIsLineChart(!isLineChart);
    const eabcChart = () => isLineChart ? SetIsLineChart(!isLineChart) : null;

    const priceData = tickersData?.quotes.USD; //Price.tsx에 전달해줄 데이터

    const navigate = useNavigate();
    const goBack = () => navigate("/");
    
    return (
        <Container>
            <Helmet>
                <title>{state?.name ? state?.name : loading ? "Loading..." : infoData?.name }</title>
            </Helmet>
            <Header>
                <div>
                    <BtnTheme onClick={toggleDark} isDark={isDark} />
                    <BtnGoBack onClick={goBack} isDark={isDark}>
                        <img src={isDark ? ico_back_w : ico_back} alt="icon go back" />
                    </BtnGoBack>
                </div>
                <Title>{state?.name ? state?.name : loading ? "Loading..." : infoData?.name }</Title>
            </Header>
            { loading ? (
                <Loader>Loading...</Loader>
                ) : ( <> 
                        <Overview>
                            <OverviewItem>
                                <span>RANK:</span>
                                <span>{infoData?.rank}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>SYMBOL:</span>
                                <span>{infoData?.symbol}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>OPEN SOURCE:</span>
                                <span>{infoData?.open_source?"Yes":"No"}</span>
                            </OverviewItem>
                        </Overview>
                        <Description>
                            {infoData?.description}
                        </Description>
                        <Overview>
                            <OverviewItem>
                                <span>TOTAL SUPPLY:</span>
                                <span>{tickersData?.total_supply}</span>
                            </OverviewItem>
                            <OverviewItem>
                                <span>MAX SUPPLY</span>
                                <span>{tickersData?.max_supply}</span>
                            </OverviewItem> 
                        </Overview>
                        <Tabs>
                            <Tab isActive={chartMatch !== null}>
                                <Link to="chart">Chart</Link>
                                {chartMatch !== null ? 
                                    <>
                                    <BtnChart isLineChart={isLineChart} onClick={LineChart}>라인차트</BtnChart>
                                    <BtnChart isLineChart={!isLineChart} onClick={eabcChart}>캔들스틱차트</BtnChart>
                                    </>
                                    : null }
                            </Tab>
                            <Tab isActive={priceMatch !== null}>
                                <Link to="price">Price</Link>
                            </Tab>
                        </Tabs>
                        <Outlet context={{ coinId: coinId, isLineChart: isLineChart, priceData: priceData }} />
                    </>
                )
            }
        </Container>
    )
}

export default Coin;