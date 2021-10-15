import { Button, Card, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useRef, useState } from "react";

import "./Pokemon.css";

const Pokemon = () => {
    const [pokemon, setPokemon] = useState("dragonite");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState("");

    var nomePokemon = useRef("");

    const getPokemon = async () => {
        const toArray = [];

        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
            const res = await axios.get(url)

            toArray.push(res.data);
            setPokemonType(res.data.types[0].type.name);
            setPokemonData(toArray);
        } catch (e) {
            console.log(e);
        }
    }

    const digitarNome = () => {
        const target = nomePokemon.current.value.toLowerCase();
        setPokemon(target)
    }

    const buscarPokemon = (e) => {
        e.preventDefault();
        getPokemon();
    }

    return (
        <Container maxWidth="md">
            <Grid container spacing={2} className="busca">
                <Grid item xs={8}>
                    <TextField label="Informe o Nome ou ID de um Pokémon"
                        variant="outlined"
                        type="search"
                        fullWidth
                        onChange={digitarNome}
                        inputRef={nomePokemon}
                        size="small"
                        className="input"
                        color="secondary"
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={buscarPokemon}
                        color="secondary"
                        variant="contained"
                        fullWidth
                        size="medium"
                    >Buscar</Button>
                </Grid>

            </Grid>
            {pokemonData.map(data => {
                return (
                    <Container maxWidth="xs">
                    <Card sx={{ maxWidth: 300 }}
                    className="card">
                        <CardMedia
                            component="img"
                            image={data.sprites["front_default"]}
                            alt={data.name} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'Tipo Principal: ' + pokemonType}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'Peso: ' + Math.round((data.weight / 4.3) * 0.45)} Kg
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {'Tamanho: ' + (data.height * 0.1)} M
                            </Typography>
                        </CardContent>
                    </Card>
                    </Container>
                )
            })}
        </Container>

    );
}

export default Pokemon;