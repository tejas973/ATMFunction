import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { render } from 'react-dom';
import './main.html';

import {renderRoutes} from '../imports/routes/routes.js'

 
Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('root'));
});