import { useState, useEffect } from "react";
import axios from "axios";
import {useCookies} from 'react-cookie'

const ModalEditProduct = (props) => {

    const [myCokkie] = useCookies(['Nombre_de_la_cookie']);

    const dataProductInit = {
        nombre: "",
        descripcion: "",
        precio: 0
    }

    let config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    const apiUrl = 'http://localhost/api-php/api.php';

    const [dataProduct, setDataProduct] = useState(dataProductInit);

    const handelChange = (e) =>{
        console.log(dataProduct);
        setDataProduct({...dataProduct, [e.target.name]: e.target.value});
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/productos/${props.idEdit}`, dataProduct, config);
            console.log('Producto actualizado exitosamente:', response);
            props.setShowModalEdit(false);
            props.getAllProducts();
        } catch(err) {
            console.error('Error al actualizar producto:', err.response?.data || err.message);
            alert('Error al actualizar: ' + (err.response?.data?.error || err.message));
        }
    }

    useEffect(()=>{
        const getProduct = async() =>{
            const res = await axios.get(`${apiUrl}/productos/${props.idEdit}`, config);
            console.log(res);
            setDataProduct(res.data);
        }
        getProduct();
    },[props.idEdit]);

    return (
        <>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-1/2 my-6 mx-auto">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Editar producto {myCokkie.Nombre_de_la_cookie}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.setShowModalEdit(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="flex items-center justify-center w-full dark:bg-gray-950">
                            <div className="w-3/4 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                                <form onSubmit={handelSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre del producto</label>
                                        <input
                                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            type="text"
                                            id="nombre"
                                            name="nombre"
                                            value={dataProduct.nombre}
                                            onChange={handelChange}
                                            placeholder="Ingresar nombre del producto"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción</label>
                                        <textarea
                                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            id="descripcion"
                                            name="descripcion"
                                            value={dataProduct.descripcion}
                                            onChange={handelChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Precio</label>
                                        <input
                                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            type="number"
                                            id="precio"
                                            name="precio"
                                            value={dataProduct.precio}
                                            onChange={handelChange}
                                            placeholder="00.00"
                                            required
                                        />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => props.setShowModalEdit(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-indigo-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
export default ModalEditProduct;