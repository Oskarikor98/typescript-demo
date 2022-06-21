import { useQuery } from "@apollo/client"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { FC } from "react"
import { GET_COUNTRIES } from "../graphQL/queries"

//Tyyppimäärittelyjä
type Props = {}

type Country = {
    name: string;
    capital: string;
}

type Row = {
    maa: string;
    pääkaupunki: string;
}

const RenderComponent: FC<Props> = props => {
    //Kutsutaan rajapintaa GET_COUNTRIES kutsulla
    const {data, loading, error} = useQuery(GET_COUNTRIES);

    const columns: Array<GridColDef> = [
        { field: 'maa', headerName: 'Maa', width: 250 },
        { field: 'pääkaupunki', headerName: 'Pääkaupunki', width: 250 },
      ];


    if(loading) {
        return(
            <p>Loading...</p>
        )
    }
    //Luodaan rivit taulukolle
   const rows: Array<Row> = data.countries.map((country: Country, index: number) => ({
        id: index,
        maa: country.name,
        pääkaupunki: country.capital
    }));
    //Palautetaan piirrettävä taulukkokomponentti
    return (
            <div>
                <DataGrid rows={rows} columns={columns} autoHeight  /> 
            </div>
    
        );
    }

export default RenderComponent;