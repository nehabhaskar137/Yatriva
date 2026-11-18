
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry';

interface Destination {
  name: string;
  country: string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  galleryNames: string[];
  bestTime: string;
  attractions: string[];
  activities: string[];
}

@Component({
  selector: 'app-destination-details',
  imports: [UpperCasePipe, FormsModule, RouterLink],
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

  // Destination information
  destinations: Record<string, Destination> = {

    // 1. KASHMIR
    kashmir: {
      name: 'Kashmir',
      country: 'India',
      tagline: 'Paradise between the mountains',
      description: 'Discover breathtaking valleys, peaceful lakes, snow-covered mountains and the warm hospitality of Kashmir.',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2200&q=90',

     gallery: [
  'assets/images/Kashmir/dal-lake.jpg',
  'assets/images/Kashmir/gulmarg.jpg',
  'assets/images/Kashmir/tulip-garden.jpg'
],

galleryNames: [
  'Dal Lake',
  'Gulmarg Winter Wonderland',
  'Srinagar Tulip Garden'
],

      bestTime: 'March to October',
      attractions: ['Dal Lake', 'Gulmarg', 'Pahalgam', 'Sonamarg'],
      activities: ['Shikara rides', 'Gondola rides', 'Mountain trekking']
    },

    // 2. RAJASTHAN
    rajasthan: {
      name: 'Rajasthan',
      country: 'India',
      tagline: 'A journey through royal heritage',
      description: 'Explore magnificent forts, colourful markets, royal palaces and the golden beauty of the desert.',
      image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Rajasthan/hawa-mahal.jpg',
  'assets/images/Rajasthan/amber-fort.jpg',
  'assets/images/Rajasthan/jaisalmer-desert.jpg'
],

galleryNames: [
  'Hawa Mahal',
  'Amber Fort',
  'Jaisalmer Golden Desert'
],

      bestTime: 'October to March',
      attractions: ['Jaipur', 'Udaipur', 'Jaisalmer Fort', 'Mehrangarh Fort'],
      activities: ['Desert safari', 'Palace visits', 'Cultural performances']
    },

    // 3. KERALA
    kerala: {
      name: 'Kerala',
      country: 'India',
      tagline: 'Where nature finds its rhythm',
      description: 'Experience beautiful backwaters, lush green landscapes, peaceful beaches and the rich culture of Gods Own Country.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Kerala/alleppey-backwaters.jpg',
  'assets/images/Kerala/munnar-teagarden.jpg',
  'assets/images/Kerala/varkala.jpg'
],

galleryNames: [
  'Alleppey Backwaters',
  'Munnar Tea Gardens',
  'Varkala Cliff Beach'
],

      bestTime: 'September to March',
      attractions: ['Alleppey', 'Munnar', 'Wayanad', 'Varkala'],
      activities: ['Houseboat cruises', 'Tea garden visits', 'Nature walks']
    },

    // 4. MANALI
    manali: {
      name: 'Manali',
      country: 'India',
      tagline: 'Find your mountain moment',
      description: 'Escape to the mountains with beautiful valleys, pine forests, rivers and unforgettable Himalayan views.',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Manali/solang.jpg',
  'assets/images/Manali/rohtang.jpg',
  'assets/images/Manali/hadmba.jpg'
],

galleryNames: [
  'Solang Valley',
  'Rohtang Pass',
  'Hadimba Temple'
],
      bestTime: 'October to June',
      attractions: ['Solang Valley', 'Rohtang Pass', 'Old Manali', 'Hadimba Temple'],
      activities: ['Paragliding', 'Snow activities', 'Trekking']
    },

    // 5. GOA
    goa: {
      name: 'Goa',
      country: 'India',
      tagline: 'Let the ocean set you free',
      description: 'Enjoy golden beaches, coastal sunsets, Portuguese heritage and the relaxed rhythm of seaside life.',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Goa/palolembeach.jpg',
  'assets/images/Goa/agoda fort.jpg',
  'assets/images/Goa/anjunabeach.jpg'
],

galleryNames: [
  'Palolem Beach',
  'Fort Aguada',
  'Anjuna Beach'
],

      bestTime: 'November to February',
      attractions: ['Baga Beach', 'Palolem Beach', 'Fort Aguada', 'Old Goa'],
      activities: ['Beach hopping', 'Water sports', 'Sunset cruises']
    },

    // 6. AGRA
    agra: {
      name: 'Agra',
      country: 'India',
      tagline: 'A timeless story of love',
      description: 'Discover remarkable Mughal architecture and the unforgettable beauty of one of the worlds most famous monuments.',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Agra/taj.jpg',
  'assets/images/Agra/agrafort.jpg',
  'assets/images/Agra/mehtab.jpg'
],

galleryNames: [
  'Taj Mahal',
  'Agra Fort',
  'Mehtab Bagh'
],

      bestTime: 'October to March',
      attractions: ['Taj Mahal', 'Agra Fort', 'Mehtab Bagh', 'Fatehpur Sikri'],
      activities: ['Heritage tours', 'Photography', 'Local food experiences']
    },

    // 7. BALI
    bali: {
      name: 'Bali',
      country: 'Indonesia',
      tagline: 'Find your island rhythm',
      description: 'Discover tropical beaches, beautiful temples, lush rice terraces and the peaceful spirit of island life.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2200&q=90',

      gallery: [
  'assets/images/Bali/tega.jpg',
  'assets/images/Bali/temple.jpg',
  'assets/images/Bali/nusa.jpg'
],

galleryNames: [
  'Tegallalang Rice Terraces',
  'Tanah Lot Temple',
  'Nusa Penida'
],

      bestTime: 'April to October',
      attractions: ['Ubud', 'Uluwatu Temple', 'Nusa Penida', 'Tegallalang Rice Terraces'],
      activities: ['Temple visits', 'Surfing', 'Waterfall exploration']
    },

    // 8. SWITZERLAND
    switzerland: {
      name: 'Switzerland',
      country: 'Europe',
      tagline: 'A little closer to the sky',
      description: 'Experience spectacular Alpine landscapes, charming villages, crystal-clear lakes and scenic mountain journeys.',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=2200&q=90',

     gallery: [
  'assets/images/Switzerland/swas.jpg',
  'assets/images/Switzerland/gru.jpg',
  'assets/images/Switzerland/tran.jpg'
],

galleryNames: [
  'Grindelwald – Swiss Alps',
  'Gruyères – Medieval Village',
  'Bernina Express'
],

      bestTime: 'April to October',
      attractions: ['Interlaken', 'Lucerne', 'Zermatt', 'Jungfraujoch'],
      activities: ['Scenic train rides', 'Mountain hiking', 'Lake cruises']
    },

    // 9. DUBAI
    dubai: {
      name: 'Dubai',
      country: 'United Arab Emirates',
      tagline: 'Where bold dreams meet the desert',
      description: 'Explore a spectacular city of modern architecture, luxury experiences, traditional souks and golden desert landscapes.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90',

     gallery: [
  'assets/images/Dubai/burj.jpg',
  'assets/images/Dubai/palm.jpg',
  'assets/images/Dubai/desert.jpg'
],

galleryNames: [
  'Burj Khalifa',
  'Palm Jumeirah',
  'Dubai Desert'
],

      bestTime: 'November to March',
      attractions: ['Burj Khalifa', 'Dubai Marina', 'Palm Jumeirah', 'Dubai Mall'],
      activities: ['Desert safari', 'Dhow cruises', 'City sightseeing']
    },

    // 10. THAILAND
    thailand: {
      name: 'Thailand',
      country: 'Thailand',
      tagline: 'Discover your tropical escape',
      description: 'Explore tropical islands, vibrant cities, beautiful temples and unforgettable food experiences.',
      image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=2200&q=90',

     
gallery: [
  'assets/images/Thailand/wat.jpg',
  'assets/images/Thailand/ph.jpg',
  'assets/images/Thailand/cha.jpg'
],

galleryNames: [
  'Wat Arun – Bangkok',
  'Phi Phi Islands',
  'Chiang Mai – Doi Suthep'
],


      bestTime: 'November to March',
      attractions: ['Phuket', 'Krabi', 'Bangkok', 'Chiang Mai'],
      activities: ['Island hopping', 'Temple tours', 'Thai food experiences']
    },

    // 11. PARIS
    paris: {
      name: 'Paris',
      country: 'France',
      tagline: 'Fall in love with every corner',
      description: 'Experience timeless architecture, charming streets, world-famous museums and the romance of the City of Light.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2200&q=90',

      
gallery: [
  'assets/images/Paris/efl.jpg',
  'assets/images/Paris/lou.jpg',
  'assets/images/Paris/mag.jpg'
],

galleryNames: [
  'Eiffel Tower',
  'Louvre Museum',
  'Montmartre'
],


      bestTime: 'April to June and September to October',
      attractions: ['Eiffel Tower', 'Louvre Museum', 'Montmartre', 'Notre-Dame'],
      activities: ['River Seine cruises', 'Museum visits', 'Café exploring']
    },

    // 12. SINGAPORE
    singapore: {
      name: 'Singapore',
      country: 'Singapore',
      tagline: 'A vibrant world of discovery',
      description: 'Discover futuristic gardens, exciting attractions, diverse neighbourhoods and a world of incredible food.',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2200&q=90',

      
gallery: [
  'assets/images/Singapore/san.jpg',
  'assets/images/Singapore/bay.jpg',
  'assets/images/Singapore/jew.jpg'
],

galleryNames: [
  'Gardens by the Bay',
  'Marina Bay Sands',
  'Jewel Changi Airport'
],

      bestTime: 'February to April',
      attractions: ['Gardens by the Bay', 'Marina Bay Sands', 'Sentosa Island', 'Chinatown'],
      activities: ['Night sightseeing', 'Garden walks', 'Food exploration']
    }

  };

  // Scroll to a section without navigating away from the destination page
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name') || '';
      this.destination = this.destinations[name.toLowerCase()];
      this.destinationName = this.destination?.name || 'Destination not found';
    });
  }

}
