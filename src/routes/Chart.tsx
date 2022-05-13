import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetcherCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
    time_open: string;
    time_close: string
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
    isLineChart: boolean;
}
interface IChartProps {
    isDark: boolean;
}
function Chart({ isDark }:IChartProps) {
    const { coinId, isLineChart } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetcherCoinHistory(coinId), 
    {
        refetchInterval: 10000,
    });
    
    return (
        <div>
            {isLoading ? "Loading chart..." : (
             <>
                {
                    isLineChart ? (
                        <ApexChart 
                            height="200px"
                            type="line"
                            series={[
                                {
                                    name: "Price",
                                    data: data?.map(price => price.close) as number[],
                                },
                            ]} 
                            options={{
                                title: {
                                    align: "right",
                                    style: {
                                        fontSize:  '16px',
                                        fontWeight:  '300',
                                        fontFamily:  'Source Sans Pro',
                                        color: isDark ? "white" : "black",
                                    },
                                    floating: true,
                                },
                                theme: {
                                    mode: isDark ? "dark" : "light",
                                },
                                chart: {
                                    width: 500,
                                    height: "100%",
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent"
                                },
                                stroke: {
                                    curve: "smooth",
                                    width: 5,
                                },
                                grid: {
                                    show: false,
                                },
                                yaxis: {
                                    show: false,
                                },
                                xaxis: {
                                    type: "datetime",
                                    categories: data?.map(time => time.time_close),
                                    axisBorder: { show: false, },
                                    axisTicks: { show: false, },
                                    labels: { show: false, },
                                },
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                        gradientToColors: ["#d6647f"],
                                        stops: [0, 100]
                                    },
                                },
                                colors: ["#59a991"],
                                tooltip: {
                                    y: {
                                        formatter: (value) => `$ ${value.toFixed(2)}`,
                                    },
                                    marker: {
                                        show: false,
                                    },
                                },
                                markers: {
                                    colors: ["rgba(0,0,0,0.4)"]
                                }
                            }}>
                        </ApexChart>
                    ) : (
                        <ApexChart 
                            height="300px"
                            type="candlestick"
                            series={[
                                {
                                    data: data?.map(((ohlc) => (
                                        {
                                            x: ohlc.time_close,
                                            y: [ohlc.open.toFixed(2), ohlc.high.toFixed(2), ohlc.low.toFixed(2), ohlc.close.toFixed(2)]
                                        }
                                    ))) ?? []
                                },
                            ]}
                            options={{
                                theme: {
                                    mode: isDark ? "dark" : "light",
                                },
                                chart: {
                                    type: 'candlestick',
                                    width: 500,
                                    height: 300,
                                    toolbar: {
                                        show: false,
                                    },
                                    background: "transparent"
                                },
                                stroke: {
                                    curve: "smooth",
                                    width: 2,
                                },
                                grid: {
                                    show: false,
                                },
                                yaxis: {
                                    show: false,
                                },
                                xaxis: {
                                    type: "datetime",
                                    categories: data?.map(time => time.time_close),
                                    axisBorder: { show: false, },
                                    axisTicks: { show: false, },
                                    labels: { show: false, },
                                },
                                fill: {
                                    opacity: 0.4,
                                    type: 'solid',
                                },
                                plotOptions: {
                                    candlestick: {
                                    colors: {
                                        upward: '#f1526a',
                                        downward: '#6286db'
                                    },
                                    wick: {
                                        useFillColor: true
                                    }
                                    }
                                }
                            }}>
                        </ApexChart>
                    )
                }
                

                
             </>   
            )}
        </div>
    )
}

export default Chart;