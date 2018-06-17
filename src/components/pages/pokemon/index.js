import React, { Component } from 'react';
import { replace } from 'react-router-redux';
//import { push } from 'react-router-redux';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination, PaginationItem, PaginationLink,
  Table
} from 'reactstrap';
import { onLogout } from '../../../actions/auth';
import API from '../../../api';
import Row from './Row';
import ReactLoading from 'react-loading';

class Pokemon extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			page: 1,
			limit: 10,
			list: [],
			next: null,
			prev: null,
			loading: true
		};
	}

	componentDidMount(){
		if(this.props.isLoggedIn !== true){
			this.props.redirectToLogin();
		}
		this.loadPokemons();
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	Logout(){
		this.props.logout();
	}

	async loadPokemons() {
		var offset = this.state.limit*(this.state.page-1);
		this.setState({
    		next : null,
    		prev : null,
    		list : [],
    		loading : true
    	})
	    await API.loadPokemons(this.state.limit, offset).then((data) => {
	    	var j = 0;
	    	for(var i = 0; i < data.results.length; i++){
	    		this.GetDetails(data.results[i]['url'], i).then((res) => {
	    			j++;
	    			data.results[res.index]['details'] = res.details;
	    			if(j === data.results.length){
	    				console.log(data);
	    				this.setState({
				    		next : data.next,
				    		prev : data.previous,
				    		list : data.results,
				    		loading : false
				    	})
	    			}
	    			
	    		})
	    	}
	    });
	}

	GetDetails(url, i){
		return new Promise(function(resolve, reject){
			API.loadUrl(url).then((data) => {
    			let resp = {
    				details : data,
    				index : i
    			};
    			resolve(resp);
	    	});
		});
	}

	ChangePage(link){
		var page = this.state.page
		if(link === 'next'){
			this.setState({
	    		page : page+1,
	    	}, () => {
	    		this.loadPokemons();
	    	});
		} else if(link === 'prev'){
			this.setState({
	    		page : page-1,
	    	}, () => {
	    		this.loadPokemons();
	    	});
		}
		
	}

	render(){
		let user = this.props.user;
		return (
			<div>
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Test Tasks</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									{user.name}
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem onClick={ () => { this.Logout(); } }>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
				
				<div className="container" style={{ backgroundColor: 'white', margin: "20px auto" }} >
					<div className="row">
						<div className="col-md-12">
							<Table className="pokemon-list-table" >
						        <thead>
									<tr>
										<th>#</th>
										<th>Picture</th>
										<th>Name</th>
										<th>Abilities</th>
										<th>Types</th>
									</tr>
						        </thead>

						        {
						        	this.state.loading === true && 
						        	<tbody>
							        	<tr>
							        		<td colSpan="5" className="text-center">
							        			<ReactLoading type="cylon" color="#000" height={30} width={100} className="loadingGif" />
							        		</td>
							        	</tr>
							        </tbody>
						        }
						        

						        { this.state.list.length > 0 &&
									<tbody>
										{ this.state.list.map(( pokemon, index ) => {
											return (
											<Row item={pokemon} key={index} />
											);
										})}
							        </tbody>
						    	}
						    </Table>
							<Pagination size="sm" aria-label="Page navigation example">
						        <PaginationItem disabled={this.state.prev == null}>
						          <PaginationLink previous onClick={ () => { this.ChangePage('prev') } }>
						          	Previous
						          </PaginationLink>
						        </PaginationItem>
						        <PaginationItem disabled={this.state.next == null}>
						          <PaginationLink next onClick={ () => { this.ChangePage('next'); } } >
						          	Next
						          </PaginationLink>
						        </PaginationItem>
						    </Pagination>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth.payload
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
    	redirectToLogin : () => {
    		dispatch(replace('/')); 
    	},
        logout: (details) => {
			dispatch(onLogout(details));
			dispatch(replace('/')); 
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);
