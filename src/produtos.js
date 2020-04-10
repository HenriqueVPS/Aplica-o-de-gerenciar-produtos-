import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'

import ProdutosHome from './produtosHome'
import Categoria from './categoria'

export default class Produtos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categorias: []
        }

        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
    }
    
    

    componentDidMount() {
        // buscar as categorias
       this.props.loadCategorias() 
    }   

    

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
            <button className='btns btns-sm' onClick={()=> this.props.removeCategoria(cat)}>
                    <span className='glyphicon glyphicon-remove'></span>
                </button>
                <Link to={`/produtos/categoria/${cat.id}`}>{cat.categoria}</Link>
            </li>
        )
    }

    handleNewCategoria(key) {
        if(key.keyCode === 13 ) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value
            })
           this.refs.categoria.value = ''
        }
    }

    render() {
        const { match, categorias }  = this.props
        return (
            <div className='row'>
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>    
                    {categorias.map(this.renderCategoria)}
                    </ul>
                    <div className='well well-sm'>
                        <input className='form-control' onKeyUp={this.handleNewCategoria} type="text" ref='categoria' placeholder='Nova categoria'/>

                    </div>
                </div>
                <div className='col-md-10'>
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome}/>
                    <Route path={match.url+'/categoria/:catId'} component={Categoria}/>
                </div>
            </div>
        )
    }
}
