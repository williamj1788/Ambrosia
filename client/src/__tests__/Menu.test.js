import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import { Menu, ProductContainer, Product } from '../components/Menu';
import toJson from 'enzyme-to-json';

let props,
    component,
    instance;
beforeEach(() => {
    props = {
        match: {
            params: {
                product: 'pizza'
            }
        }
    }
    component = shallow(<Menu {...props} />,{
        disableLifecycleMethods: true,
    });
    instance = component.instance();
});

describe('Menu Tests',() => {
    global.window.scrollTo = jest.fn();
    test('should render', () => {
        expect(component).toBeTruthy();
    });
    
    test('redirectToProduct should called setState with correct args' , () => {
        jest.spyOn(instance, 'setState');
        instance.redirectToProduct('mock product');
        const expectArgs = {
            redirect: true,
            productTarget: 'mock product',
        }
        expect(instance.setState).toBeCalledWith(expectArgs);
    });
    
    test('componentDidUpdate should called setState with correct args if redirect state is true' , () => {
        jest.spyOn(instance, 'setState');
        component.setState({redirect: true});
        instance.componentDidUpdate();
        const expectArgs = {
            redirect: false,
            productTarget: null,
        }
        expect(instance.setState).toBeCalledWith(expectArgs);
    });
    
    test('should redirect to product if redirect state is true', () => {
        component.setState({redirect: true, productTarget: 'mockTarget'});
        expect(instance.render()).toEqual(<Redirect to={'/menu/mockTarget'} />);
    });

    test('<ProductContainer /> is given correct props based on url', () => {
        const productData = { 
            pizza:[
                {
                    img: 'mock img',
                    name: 'Tombstone Pizza',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '9.99',
                }
            ],
            pasta:[],
            drink:[],
            bread:[],
            dessert:[]
        }
        component = shallow(<Menu {...props} />);
        component.setState({ productData });
        expect(component.find('ProductContainer').prop('products')).toEqual(productData.pizza);
    });
});

describe('ProductContainer Tests', () => {
    test('<ProductContainer /> should render correct number of Product based on props ', () => {
        const props = {
            products: [
                {
                    img: 'mock img',
                    name: 'Tombstone 1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '9.99',
                },
                {
                    img: 'mock img',
                    name: 'Tombstone 2',
                    description: 'adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '19.99',
                }
            ],
        }
        component = shallow(<ProductContainer {...props} />);
        expect(component.find('Product')).toHaveLength(2);
    });
    
    test('<ProductContainer /> should render Products with correct props based on props ', () => {
        const props = {
            products: [
                {
                    img: 'mock img',
                    name: 'Tombstone 1',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '9.99',
                },
                {
                    img: 'mock img',
                    name: 'Tombstone 2',
                    description: 'adipiscing elit. Lorem ipsum dolor sit amet,',
                    price: '19.99',
                }
            ],
        }
        component = shallow(<ProductContainer {...props} />);
        expect(component.find('Product').first().props()).toEqual(props.products[0]);
        expect(component.find('Product').at(1).props()).toEqual(props.products[1]);
    });
});

describe('Product Tests', () => {
    test('Snapshot Test', () => {
        const props = {
            img: 'mock img',
            name: 'mock name',
            description: 'mock description',
            prick: 'mock price',
        }
        
        component = shallow(<Product {...props} />);
        expect(toJson(component)).toMatchSnapshot();
    });
});