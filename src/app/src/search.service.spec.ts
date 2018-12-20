import {MockBackend} from "@angular/http/testing";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { JsonpModule, BaseRequestOptions, Jsonp, Response, ResponseOptions } from "@angular/http";

import { SearchService } from "./search.service";

describe("Serach Service", () => {
    let service: SearchService;
    let backend: MockBackend

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [JsonpModule],
            providers:[
                SearchService, 
                MockBackend, 
                BaseRequestOptions,
                {
                    provide: Jsonp,
                    useFactory: (backend, options) => new Jsonp(backend, options),
                    deps:[MockBackend, BaseRequestOptions]
                }
            ]
        });

        backend = TestBed.get(MockBackend);
        service = TestBed.get(SearchService);
    });

    it("Search should return search items", fakeAsync(() => {
        let res = {
            "resultCount": 1,
            "results": [{
                "artistId": "12345",
                "artistName": "U2",
                "trackName": "Beautiful Day",
                "artworkUrl60": "image.jpg"
            }]
        };

        backend.connections.subscribe(connection => {
            connection.mockRespond(new Response(<ResponseOptions>{
              body: JSON.stringify(res)
            }));
        });
        
        service.search("U2");
        tick();

        expect(service.results.length).toBe(1);
        expect(service.results[0].artist).toBe("U2");
        expect(service.results[0].artistId).toBe("12345");
        expect(service.results[0].name).toBe("Beautiful Day");
        expect(service.results[0].thumbnail).toBe("image.jpg");
    }));

})