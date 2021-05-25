import React from 'react';
import { Result, Button } from 'antd';

import history from '../../utils/history';

class NotFound extends React.Component {

  render () {
    return (
      <div className="row">
        <div className="col-lg-12 col-md-6">
          <Result
            status="404"
            title="404"
            subTitle="Lo sentimos, al parecer la página ingresada no existe"
            extra={
              <Button type="primary" onClick={() => history.push('/')}>
                Regresar al inicio
              </Button>
            }
          />
      </div>
    </div>
  );
  }
}

export default NotFound;
