import React, { Component } from 'react'
import './search.css'
let data = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class ProductRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render() {
        return (
            <tr><th colSpan="2">{this.props.name}</th></tr>
        )
    }
}

class ProductTable extends React.Component {
    render() {
        let rows = []
        let lastCategory = null
        this.props.product.forEach((item, index) => {
            if (item.name.indexOf(this.props.filteText) == -1) {
                return
            }
            if (item.category !== lastCategory) {
                rows.push(<ProductCategoryRow name={item.category} key={index} />)
            }
            rows.push(<ProductRow product={item} key={item.name} />)
            lastCategory = item.category
        })
        return (
            <table>
                <thead>
                    <tr>
                        <td>name</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

class SearchBar extends React.Component {
    constructor() {
        super()
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }
    handleSearchChange(event) {
        this.props.onfilterTextInput(event.target.value)
    }
    handleCheckChange(event) {
        this.props.handleCheckChange(event.target.checked)
    }
    render() {
        return (
            <div>
                <input type="text" value={this.props.filteText} onChange={this.handleSearchChange} />
                <div>
                    <input type="checkbox" onChange={this.handleCheckChange} />
                    <span>排序</span>
                </div>
            </div>
        )
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.onfilterTextInput = this.onfilterTextInput.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.state = {
            filteText : '',
            product: this.props.product
        }
    }
    onfilterTextInput(value) {
        console.log(value)
        this.setState({
            filteText: value
        })
    }
    handleCheckChange(value) {
        if (value) {
            let arr = this.state.product
            let Temp = ''
            for (var i=0; i<arr.length-1; i++) {
                console.log('a')
                var sign = true                
                for (var j=1; j<arr.length-i; j++) {
                    if (parseFloat(arr[j-1].price.slice(1)) > parseFloat(arr[j].price.slice(1))) {
                        Temp = arr[j-1]
                        arr[j-1] = arr[j]
                        arr[j] = Temp
                        sign = false
                    }
                }
                if (sign) {
                    break
                }
            }
            console.log(arr)
            this.setState({
                product: arr
            })
        }
    }
    render() {
        return (
            <div>
                <SearchBar onfilterTextInput={this.onfilterTextInput} handleCheckChange={this.handleCheckChange} filteText={this.state.filteText}/>
                <ProductTable product={this.state.product} filteText={this.state.filteText}/>
            </div>
        )
    }
}
export default FilterableProductTable