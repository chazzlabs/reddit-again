import moment from 'moment';

class TimeService {

    getFormattedUnixTime(timestamp) {
        return moment.unix(timestamp).fromNow();
    }
}

export const timeService = new TimeService();
