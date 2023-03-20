import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categories, onClick } = this.props;
    return (
      categories.map((category) => (
        <input
          type="button"
          value={ category.name }
          key={ category.id }
          data-testid="category"
          onClick={ () => onClick(category.id) }
        />
      ))
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Categories;
