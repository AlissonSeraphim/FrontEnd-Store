import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categories } = this.props;
    console.log(categories);
    return (
      categories.map((category) => (
        <input
          type="button"
          value={ category.name }
          key={ category.id }
          data-testid="category"
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
};

export default Categories;
