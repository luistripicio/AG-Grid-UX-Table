import moment from 'moment';

export const formatNumber = function (params) {
    var number = params.value;
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const dateFormatter = function (params) {
    return moment(params.value).format('MM/DD/YYYY');
}