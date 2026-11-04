
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry';

interface Destination {
  name: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  bestTime: string;
  attractions: string[];
  activities: string[];
}

@Component({
  selector: 'app-destination-details',
  imports: [UpperCasePipe, FormsModule],
  templateUrl: './destination-details.html',
  styleUrl: './destination-details.scss',
})
export class DestinationDetails implements OnInit {

  destinationName = '';
  destination: Destination | undefined;
  formMessage = '';

  constructor(
    private route: ActivatedRoute,
    private enquiryService: EnquiryService
  ) {}

  // Submit travel enquiry to Django backend
  submitTrip(form: any): void {

    if (form.invalid) {
      this.formMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const enquiryData = {
      name: form.value.name,
      email: form.value.email,
      destination: form.value.destination,
      travel_date: form.value.travelDate,
      travellers: Number(form.value.travellers),
      budget: form.value.budget,
      message: form.value.message
    };

    this.formMessage = 'Submitting your enquiry...';

    this.enquiryService.submitEnquiry(enquiryData).subscribe({

      next: (response) => {
        this.formMessage = 'Thank you! Your travel enquiry has been received.';
        console.log('Enquiry saved:', response);
        form.resetForm();
      },

      error: (error) => {
        console.error('Enquiry submission failed:', error);
        this.formMessage = 'Sorry, something went wrong. Please try again.';
      }

    });
  }

  // Destination details
  destinations: Record<string, Destination> = {

    kashmir: {
      name: 'Kashmir',
      country: 'India',
      tagline: 'Paradise between the mountains',
      description: 'Discover breathtaking valleys, peaceful lakes, snow-covered mountains and the warm hospitality of Kashmir.',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'March to October',
      attractions: ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
      activities: ['Shikara rides', 'Gondola rides', 'Mountain trekking']
    },

    rajasthan: {
      name: 'Rajasthan',
      country: 'India',
      tagline: 'A journey through royal heritage',
      description: 'Explore magnificent forts, colourful markets, royal palaces and the golden beauty of the desert.',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'October to March',
      attractions: ['Jaipur', 'Udaipur', 'Jaisalmer Fort', 'Mehrangarh Fort'],
      activities: ['Desert safari', 'Palace visits', 'Cultural performances']
    },

    kerala: {
      name: 'Kerala',
      country: 'India',
      tagline: 'Where nature finds its rhythm',
      description: 'Experience beautiful backwaters, lush green landscapes, peaceful beaches and the rich culture of Gods Own Country.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'September to March',
      attractions: ['Alleppey', 'Munnar', 'Wayanad', 'Varkala'],
      activities: ['Houseboat cruises', 'Tea garden visits', 'Nature walks']
    },

    manali: {
      name: 'Manali',
      country: 'India',
      tagline: 'Find your mountain moment',
      description: 'Escape to the mountains with beautiful valleys, pine forests, rivers and unforgettable Himalayan views.',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'October to June',
      attractions: ['Solang Valley', 'Rohtang Pass', 'Old Manali', 'Hadimba Temple'],
      activities: ['Paragliding', 'Snow activities', 'Trekking']
    },

    goa: {
      name: 'Goa',
      country: 'India',
      tagline: 'Let the ocean set you free',
      description: 'Enjoy golden beaches, coastal sunsets, Portuguese heritage and the relaxed rhythm of seaside life.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'November to February',
      attractions: ['Baga Beach', 'Palolem Beach', 'Fort Aguada', 'Old Goa'],
      activities: ['Beach hopping', 'Water sports', 'Sunset cruises']
    },

    agra: {
      name: 'Agra',
      country: 'India',
      tagline: 'A timeless story of love',
      description: 'Discover remarkable Mughal architecture and the unforgettable beauty of one of the worlds most famous monuments.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'October to March',
      attractions: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri'],
      activities: ['Heritage tours', 'Photography', 'Local food experiences']
    },

    bali: {
      name: 'Bali',
      country: 'Indonesia',
      tagline: 'Find your island rhythm',
      description: 'Discover tropical beaches, beautiful temples, lush rice terraces and the peaceful spirit of island life.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'April to October',
      attractions: ['Ubud', 'Uluwatu Temple', 'Nusa Penida', 'Tegallalang Rice Terraces'],
      activities: ['Temple visits', 'Surfing', 'Waterfall exploration']
    },

    switzerland: {
      name: 'Switzerland',
      country: 'Europe',
      tagline: 'A little closer to the sky',
      description: 'Experience spectacular Alpine landscapes, charming villages, crystal-clear lakes and scenic mountain journeys.',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'April to October',
      attractions: ['Interlaken', 'Lucerne', 'Zermatt', 'Jungfraujoch'],
      activities: ['Scenic train rides', 'Mountain hiking', 'Lake cruises']
    },

    dubai: {
      name: 'Dubai',
      country: 'United Arab Emirates',
      tagline: 'Where bold dreams meet the desert',
      description: 'Explore a spectacular city of modern architecture, luxury experiences, traditional souks and golden desert landscapes.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'November to March',
      attractions: ['Burj Khalifa', 'Dubai Marina', 'Palm Jumeirah', 'Dubai Mall'],
      activities: ['Desert safari', 'Dhow cruises', 'City sightseeing']
    },

    thailand: {
      name: 'Thailand',
      country: 'Thailand',
      tagline: 'Discover your tropical escape',
      description: 'Explore tropical islands, vibrant cities, beautiful temples and unforgettable food experiences.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'November to March',
      attractions: ['Phuket', 'Krabi', 'Bangkok', 'Chiang Mai'],
      activities: ['Island hopping', 'Temple tours', 'Thai food experiences']
    },

    paris: {
      name: 'Paris',
      country: 'France',
      tagline: 'Fall in love with every corner',
      description: 'Experience timeless architecture, charming streets, world-famous museums and the romance of the City of Light.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'April to June and September to October',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Notre-Dame'],
      activities: ['River Seine cruises', 'Museum visits', 'Café exploring']
    },

    singapore: {
      name: 'Singapore',
      country: 'Singapore',
      tagline: 'A vibrant world of discovery',
      description: 'Discover futuristic gardens, exciting attractions, diverse neighbourhoods and a world of incredible food.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2200&q=90',
      bestTime: 'February to April',
      attractions: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island', 'Chinatown'],
      activities: ['Night sightseeing', 'Garden walks', 'Food exploration']
    }

  };

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name') || '';
      this.destination = this.destinations[name.toLowerCase()];
      this.destinationName = this.destination?.name || 'Destination not found';
    });
  }

}
