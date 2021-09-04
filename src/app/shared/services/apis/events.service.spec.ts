import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { EventService } from "./events.service";
import { Events } from '../unit-dummy-data/event-service';



describe('Events Service Test', () => {

  let eventService: EventService;
  let httpTestingController: HttpTestingController;
  const apiKey = `?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;
  const local = `&locale=*`;
  const tickerMasterUrl = 'https://app.ticketmaster.com/discovery/v2/events';

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    eventService = TestBed.get(EventService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('Service should be defined', () => {
    expect(eventService).toBeDefined();
  })


  describe('Api that retunrs events getEvents()', () => {

    it('get events should return expected data', (done) => {

      eventService.getEvents().subscribe(data => {
        expect(data).toEqual(Events._embedded.events);
        done();
      });
      const getAllEventsRequest: TestRequest = httpTestingController.expectOne(tickerMasterUrl + apiKey + local);
      getAllEventsRequest.flush(Events);
    });

    it('get events should use GET to retrieve data', () => {
      eventService.getEvents().subscribe();

      const getAllEventsRequest: TestRequest = httpTestingController.expectOne(tickerMasterUrl + apiKey + local);

      expect(getAllEventsRequest.request.method).toEqual('GET');
    });


    it("should throw an error if there is an error in api", () => {
      let error: string;
      eventService.getEvents().subscribe(null, err => {
        error = err;
      });

      let req = httpTestingController.expectOne(tickerMasterUrl + apiKey + local);
      req.flush("Something went wrong", {
        status: 404,
        statusText: "Network error"
      });

      expect(error.indexOf("Error in api returned code 404: Http failure response for https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*: 404 Network error") >= 0).toBeTruthy();
    });


  });

  // Todo Similarly can do testing for getEvent and searchEvents methods


});