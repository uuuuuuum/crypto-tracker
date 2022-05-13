import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { BtnTheme } from '../App';

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

const Title = styled.h1`
    font-size: 40px;
    color: ${props => props.theme.accentColor};  
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
    margin-bottom: 10px;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.boxColor};
    border-radius: 10px;
    box-shadow: 2px 2px 2px ${props => props.theme.boxShadowColor};
    a {
        display: flex;        
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Loader = styled.span`
  text-align  : center;
`;

const Img = styled.img`
    margin-right: 10px;
    width: 35px;
    height: 35px;
`

interface ICoin {
    id: string
    name: string
    symbol: string
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

interface ICoinProps {
    toggleDark: () => void;
    isDark: boolean;
}

function Coins({ toggleDark, isDark }:ICoinProps) {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    
    return (
        <Container>
            <Helmet>
                <title>코인</title>
            </Helmet>
            <Header>
                <div>
                    <BtnTheme onClick={toggleDark} isDark={isDark}></BtnTheme>
                </div>
                <Title>코인</Title>
            </Header>
            { isLoading ? (
                <Loader>Loading...</Loader>
                ) : (
                    <CoinsList>
                        {data?.slice(0, 100).map(coin =>
                            <Coin key={coin.id}>
                                <Link to={`/${coin.id}`} state={{name: coin.name}}>
                                    <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                                    {coin.name} &rarr;
                                </Link>
                            </Coin>
                        )}
                    </CoinsList>
                )
            }
        </Container>
    )
}

export default Coins;