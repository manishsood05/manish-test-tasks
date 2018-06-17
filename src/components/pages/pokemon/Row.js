import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    item: PropTypes.object.isRequired 
}

class Row extends Component {

    render(){
    	return(
    		<tr>
    			<td>
    				#
    				{ this.props.item.details.id }
    			</td>
    			<td>
    				<img src={this.props.item.details.sprites.front_default} style={{ width: "60px" }} alt={this.props.item.name} />
    			</td>
    			<td>{this.props.item.name}</td>
    			<td>
    				{
    					this.props.item.details.abilities.map(( ability, index ) => {
							return (
								<span key={index}>{ability.ability.name}, </span>
							);
						})
					}
    			</td>
    			<td>
    				{
    					this.props.item.details.types.map(( type, index ) => {
							return (
								<span key={index}>{type.type.name}, </span>
							);
						})
					}
    			</td>
    		</tr>
    	);
    }

}

Row.propTypes = propTypes;
export default Row;