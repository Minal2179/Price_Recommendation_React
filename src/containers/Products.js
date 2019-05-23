import React, {Component, Suspense} from 'react';
import axios from 'axios';
import { Form,Row,Col,Button } from 'react-bootstrap';

axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = 'csrftoken'

class Products extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.postProducts = this.postProducts.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.handleClickPrice = this.handleClickPrice.bind(this);
    
        this.state = {
          isLoading: false,
          prod:'',
          itemCond: 1,
          ship: 0,
          brand: 0,
          dept: 0,
          cat: 0,
          subcat: 0,
          description: '',
          price: 0,
          id:9
        };
      }
    
    
     handleChange(e){
         this.setState({[e.target.id]: e.target.value});

      }
    
    
      async handleClick() {
        const posturl = "http://127.0.0.1:8000/products/"
        this.getProducts(posturl)
        const data = {
            "name": this.state.prod,
            "item_condition": this.state.itemCond,
            "category": {
                "title": this.state.dept,
                "sub": this.state.cat,
                "sub2": this.state.subcat
            },
            "brand_name": this.state.brand,
            "shipping": this.state.ship,
            "item_description": "Great",
            "price": 0
        }
        console.log("Data: "+ data);
        try{
           this.postProducts(posturl, data);
        }
        catch (error) {
            console.error(error)
          }

        // this.setState({prod:this.state.prod,brand:this.state.brand});

        console.log("prod: " + this.state.prod);
        console.log("brand: " + this.state.brand);
        console.log("dept: " + this.state.dept);
        console.log("cat: " + this.state.cat);
        console.log("subcat: " + this.state.subcat);
        console.log("ship: " + this.state.ship);
    
      }

      async handleClickPrice() {
        const product_id = this.state.id;
        const priceurl = `http://127.0.0.1:8000/products/${product_id}/price`
        await this.getPrice(priceurl)
        // if(this.state.prod=='')
        //   alert("Enter Product Id");
        // else
        //   alert(this.state.prod+":"+this.state.price);
    
      }

    // state={
    //     name: '',
    //     item_condition: 1,
    //     brand_name: 1,
    //     department: 0,
    //     category: 0,
    //     sub_category: 0,
    //     shipping: 0,
    //     description: '',
    //     price: 0
    // };

    componentDidMount(){
        // const product_id = this.props.params.match.product_id
        
        const posturl = "http://127.0.0.1:8000/products/"
        
        
    }

    postProducts = (url, data) => {
      let currentComponent = this
      console.log(data);
      var headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods" : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
      axios.post(url, data)
      .then(function(response){
          console.log(response)
          console.log(response.data.id);
          currentComponent.setState({
            id: response.data.id
        });
        alert("New Product Added with id "+ currentComponent.state.id)
          console.log(currentComponent.state.id);
      })
      .catch(function(error){
          console.log(error);
      });
    }

    getProducts(url){
        axios.get(url)
        .then(function(response){
            console.log("Response get:")
            console.log(response);
        })
        .catch(function(error){
            console.log(error);
        });
    }

    getPrice= (url, id) => {
      let currentComponent = this
        axios.get(url)
        .then(res => {
          console.log(res);
          currentComponent.setState({
                price: res.data.data.price
            });
            console.log(currentComponent.state.price);
            alert("Price :" + res.data.data.price);
        })
        .catch(err => {
            this.setState({
                errors: err.response.data
            });
            alert("Status:"+ err.response.status+ "\nError: "+ err.response.data.detail)
        })

    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    
    render(){
        const { isLoading } = this.state;
        return(
            <Suspense fallback={this.loading()}>
              <div className="Form-style">
        <Form>
          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Product Name</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="prod">
              <Form.Control placeholder="Enter product name" name="prod" value={this.state.prod} onChange={event => this.handleChange(event)} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Brand Name</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="brand">
              <Form.Control placeholder="Enter brand name" name="brand" value={this.state.brand} onChange={event => this.handleChange(event)} />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Item Condition</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="item">
            <Form.Control as="select" value={this.state.itemCond} name="itemCond" onChange={event => this.handleChange(event)}>
                <option>Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Department</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="dept">
              <Form.Control placeholder="Enter department" name="dept" value={this.state.dept} onChange={event => this.handleChange(event)}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Category</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="cat">
              <Form.Control placeholder="Enter category" name="cat" value={this.state.cat} onChange={event => this.handleChange(event)}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className="labels">
              <Form.Label>Sub Category</Form.Label>
            </Form.Group>
            <Form.Group as={Col} controlId="subcat">
              <Form.Control placeholder="Enter sub category" name="subcat" value={this.state.subcat} onChange={event => this.handleChange(event)}/>
            </Form.Group>
          </Form.Row>
        
          <Form.Row> 
            <Form.Group as={Col} className="labels" id="ship">
              <Form.Label> Shipping </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Check inline label="Buyer" type="radio" name="ship" value='0' onChange={event => this.handleChange(event)}/>
              <Form.Check inline label="Seller" type="radio" name="ship" value='1' onChange={event => this.handleChange(event)}/>
            </Form.Group>
          </Form.Row>
           <div className='btnProd'>
            <Button variant="primary" className="btnProd" onClick={this.handleClick}>Add Product</Button>
            </div>
            <div className='btnPrice'>
            <Button variant="primary" className="btnPrice" onClick={this.handleClickPrice}>Get Price</Button>
        </div>
      </Form>
        </div>
            </Suspense>
        );
    }
}
export default Products;