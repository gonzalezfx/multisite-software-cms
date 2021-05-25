import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Popconfirm, Skeleton, Descriptions, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import parse from 'html-react-parser';

import {
  fetchTestimonial,
  deleteTestimonial,
} from '../../actions/testimonialActions';
import history from '../../utils/history';
import PageLayout from '../layout/PageLayout';

const TestimonialShow = ({
  configs,
  match,
  fetchTestimonial,
  deleteTestimonial,
  testimonial,
}) => {
  const { currentSite } = configs;
  useEffect(() => {
    fetchTestimonial(match.params.id);
  }, []);

  const handleDelete = id => {
    deleteTestimonial(id)
      .then(() => {
        history.push(`/${currentSite.slug}/testimonials`);
      })
      .catch(() => {
        message.error('Lo sentimos, ocurrió un error al eliminar.');
      });
  };

  return (
    <PageLayout>
      {!testimonial ? (
        <Skeleton paragraph={{ rows: 6 }} active />
      ) : (
        <>
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <h2>Testimonio ID-{testimonial.id}</h2>
            </div>
            <div className="col-lg-6 col-md-6">
              <Popconfirm
                title="Seguro que desea eliminar?"
                cancelText="Cancelar"
                onConfirm={() => handleDelete(testimonial.id)}
              >
                <Button danger className="float-right">
                  <DeleteOutlined />
                  Eliminar
                </Button>
              </Popconfirm>
              <Button
                onClick={() =>
                  history.push(
                    `/${currentSite.slug}/testimonials/edit/${testimonial.id}`
                  )
                }
                style={{ marginRight: '10px' }}
                className="float-right"
              >
                <EditOutlined />
                Editar
              </Button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <Descriptions
                layout="vertical"
                column={2}
                bordered
                style={{ backgroundColor: 'white' }}
              >
                <Descriptions.Item label="Empresa">
                  {testimonial.company_name}
                </Descriptions.Item>
                <Descriptions.Item label="Logo">
                  <img
                    src={testimonial.full_logo_url}
                    style={{ maxWidth: 200 }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Descripción" span={2}>
                  {testimonial.description && parse(testimonial.description)}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { testimonial: state.testimonials[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchTestimonial,
  deleteTestimonial,
})(TestimonialShow);
