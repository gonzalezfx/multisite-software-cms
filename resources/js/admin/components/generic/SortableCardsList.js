import React from 'react';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Card } from 'antd';

const SortableItem = sortableElement(({ order, image, content, actions }) => {

  const DragHandle = sortableHandle(() => (
    <div>
      <span className="sortable-order">{order+1}</span>
      <img src={image} />
    </div>
  ));

  return (
    <Card
      hoverable
      className="sortable-image-item"
      cover={<DragHandle />}
      actions={actions}
      bodyStyle={{ display: content ? "block" : "none" }}
    >
      {content}
    </Card>
  )
});

const SortableContainer = sortableContainer(({children}) => {
  return <div className="sortable-images-list">{children}</div>;
});

class SortableCardsList extends React.Component {

  state = {
    items: [],
  };

  componentDidMount() {
    this.setState({
      items: this.props.items,
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.props.items.length != this.state.items.length) {
      this.setState({
        items: this.props.items,
      });
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });

    this.props.onOrderChanged(this.state.items);
  };

  render() {
    const { items } = this.state;

    return (
      <SortableContainer axis="xy" onSortEnd={this.onSortEnd} useDragHandle>
        {items.map((item, index) => {
          const { key, ...restProps } = item;

          return <SortableItem key={`item-${key}`} index={index} order={index} {...restProps} />
        })}
      </SortableContainer>
    );
  }
}

export default SortableCardsList;
