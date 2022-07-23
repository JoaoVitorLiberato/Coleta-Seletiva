import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { ChangeEvent, FormEvent, useEffect, useState, useCallback } from 'react';

import api from '../../services/api';

import Logo from '../../assets/logo.svg'
import './style.css'

interface Item {
    id: number;
    title: string;
    image_url: string;
}

export default function CreateLocation() {

    const [items, setItems] = useState<Item[]>([]);
    const [posicao, setPosicao] = useState<[number, number]>([0, 0]);
    const [dataForm, setDataForm] = useState({
        name: '',
        email: '',
        wattsapp: '',
        city: '',
        uf: '',
    });
    const [itensSelecionado, setItemSelecionados] = useState<number[]>([])


    useEffect(() => {
        api.get('items')
            .then(response => { setItems(response.data) })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
        // console.log(event);
        setPosicao([
            event.latlng.lat,
            event.latlng.lng,
        ]);
    }, [])

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setDataForm({
            ...dataForm,
            [name]: value
        })
    }, [dataForm])

    const  handleItem = useCallback((id: number) => {
        // setItemSelecionados([...itensSelecionado, id]);
        const procurarItens = itensSelecionado.findIndex(items => items === id)
        if (procurarItens >= 0) {
            const filtarItens = itensSelecionado.filter(items => items !== id);
            setItemSelecionados(filtarItens);
        } else {
            setItemSelecionados([...itensSelecionado, id]);
        }
    }, [itensSelecionado])

    const handleSubmit = useCallback(async(event: FormEvent) => {
        event.preventDefault();
        const { name, email, wattsapp, city, uf } = dataForm;
        const [latitude, longetude] = posicao;
        const itens = itensSelecionado;

        const data = {
            name,
            email,
            wattsapp,
            city,
            uf,
            latitude,
            longetude,
            itens
        }
        await api.post('locations', data);
        {alert('Formulario enviado com sucesso!')}
    }, [dataForm, posicao, itensSelecionado])


    return (
        <div id="page-create-location">
            <div className="content">
                <header>
                    <img src={Logo} alt="" />
                    <Link to='/'>
                        <FiArrowLeft />
                        Voltar para home
                    </Link>
                </header>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do <br /> local de coleta</h1>

                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>

                        <div className="field">
                            <label htmlFor="name">Nome da entidade</label>
                            <input type="text" name='name' id='name' onChange={handleInputChange} />
                        </div>
                        <div className='field-group'>
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" onChange={handleInputChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="wattsapp">Wattsapp</label>
                                <input type="text" name="wattsapp" id="wattsapp" onChange={handleInputChange} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Marque um endereço no mapa</span>
                        </legend>
                        <MapContainer center={[-23.0003709, -43.365895]} zoom={14} onClick={handleMapClick}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={posicao} />
                        </MapContainer>
                        <div className='field-group'>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <input type="text" name="city" id="city" onChange={handleInputChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="uf">Estado</label>
                                <input type="text" name="uf" id="uf" onChange={handleInputChange} />
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>
                            <h2>Itens Coletado</h2>
                            <span>Você pode marcar um ou mais itens</span>
                        </legend>
                        <ul className="items-grid">
                            {items.map(item => (
                                <li
                                    key={item.id}
                                    onClick={() => handleItem(item.id)}
                                    className={itensSelecionado.includes(item.id) ? 'selected' : ''}>
                                    <img src={item.image_url} alt={item.title} />
                                </li>
                            ))}
                        </ul>
                    </fieldset>
                    <button type='submit'>
                        Cadastrar local de coleta
                    </button>
                </form>
            </div>
        </div>
    );
}