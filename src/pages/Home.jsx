import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalAddProduct from '../components/ModalAddProduct';
import ModalEditProduct from '../components/ModalEditProduct';
import { useCookies } from "react-cookie";

const Home = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [idEdit, setIdEdit] = useState(0);
    const [cookies, setCookie] = useCookies(['Nombre_de_la_cookie']);


    const apiUrl = 'http://localhost/api-php/api.php';
    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    }

    const getAllProducts = async () => {
        const res = await axios.get(`${apiUrl}/productos`, config);
        console.log(res);
        setData(res.data);
    }

    const openModalEdit = (id) =>{
        setIdEdit(id);
        setShowModalEdit(true);
    }

    const deletProduct = async(id) =>{
        await axios.delete(`${apiUrl}/productos/${id}`, config)
        .then(response =>{
            console.log(response);
        })
        .catch(err =>{
            console.log(err);
        });
        setShowModalEdit(false);
        getAllProducts();
    }

    useEffect(() => {
        getAllProducts();
        setCookie('Nombre_de_la_cookie', 'Esto_es_el_valor_de_la_cookie');
    }, []);

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
                        Productos
                        <button 
                            className="text-base flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                            onClick={() =>{setShowModal(true)}}
                        >
                            Agregar
                        </button>
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Productos en existencia</p>
                </div>
                <div className="w-full mx-auto overflow-auto">
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">ID</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Nombre</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Descripción</th>
                                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Precio</th>
                                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, key) => (
                                <tr key={key}>
                                    <td className="px-4 py-3">{item.id}</td>
                                    <td className="px-4 py-3">{item.nombre}</td>
                                    <td className="px-4 py-3">{item.descripcion}</td>
                                    <td className="px-4 py-3 text-lg text-gray-900">{item.precio}</td>
                                    <td className="w-10 text-center flex">
                                        <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded" onClick={()=>{openModalEdit(item.id)}}>Editar</button>
                                        <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded" onClick={()=>{deletProduct(item.id)}}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">Learn More
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </a>
                    <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Button</button>
                </div>
            </div>
            {showModal && <ModalAddProduct setShowModal={setShowModal} getAllProducts={getAllProducts}/>}
            {showModalEdit && <ModalEditProduct setShowModalEdit={setShowModalEdit} getAllProducts={getAllProducts} idEdit={idEdit}/>}
        </section>
    );
}

export default Home;