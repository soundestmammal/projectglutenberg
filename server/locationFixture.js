const locationFixture = {
  ip: '8.8.8.8',
  hostname: 'google-public-dns-a.google.com',
  continent_code: 'NA',
  continent_name: 'North America',
  country_code2: 'US',
  country_code3: 'USA',
  country_name: 'United States',
  country_capital: 'Washington',
  state_prov: 'California',
  district: '',
  city: 'Mountain View',
  zipcode: '94043',
  latitude: '37.4229',
  longitude: '-122.085',
  is_eu: false,
  calling_code: '+1',
  country_tld: '.us',
  languages: 'en-US,es-US,haw,fr',
  country_flag: 'https://ipgeolocation.io/static/flags/us_64.png',
  isp: 'Level 3 Communications',
  connection_type: '',
  organization: 'Google Inc.',
  geoname_id: '5375480',
  currency: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$'
  },
  time_zone: {
    name: 'America/Los_Angeles',
    offset: -8,
    current_time: '2019-01-14 03:30:00.135-0800',
    current_time_unix: 1547465400.135,
    is_dst: false,
    dst_savings: 1
  }
}

const geocodeFixture = {
  results: [
    {
      address_components: [
        {
          long_name: 'Europe',
          short_name: 'Europe',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'England',
          short_name: 'England',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Greater London',
          short_name: 'Greater London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'European Union',
          short_name: 'European Union',
          types: [
            'political_union'
          ]
        },
        {
          long_name: 'SW1A 2DX',
          short_name: 'SW1A 2DX',
          types: [
            'postal_code'
          ]
        },
        {
          long_name: 'United Kingdom',
          short_name: 'United Kingdom',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London SW1A 2DX, United Kingdom',
      geometry: {
        bounds: {
          northeast: {
            lat: '51.6673219',
            lng: '0.0323526'
          },
          southwest: {
            lat: '51.3473219',
            lng: '-0.2876474'
          }
        },
        location: {
          lat: '51.5073219',
          lng: '-0.1276474'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'Europe',
          short_name: 'Europe',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'England',
          short_name: 'England',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Greater London',
          short_name: 'Greater London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'European Union',
          short_name: 'European Union',
          types: [
            'political_union'
          ]
        },
        {
          long_name: 'United Kingdom',
          short_name: 'United Kingdom',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, United Kingdom',
      geometry: {
        bounds: {
          northeast: {
            lat: '51.6918741',
            lng: '0.3340155'
          },
          southwest: {
            lat: '51.2867601',
            lng: '-0.5103751'
          }
        },
        location: {
          lat: '51.4893335',
          lng: '-0.144055084527687'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'City of London',
          short_name: 'City of London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'Europe',
          short_name: 'Europe',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'England',
          short_name: 'England',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Greater London',
          short_name: 'Greater London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'European Union',
          short_name: 'European Union',
          types: [
            'political_union'
          ]
        },
        {
          long_name: 'United Kingdom',
          short_name: 'United Kingdom',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'City of London, United Kingdom',
      geometry: {
        bounds: {
          northeast: {
            lat: '51.5233213',
            lng: '-0.0727261'
          },
          southwest: {
            lat: '51.5068696',
            lng: '-0.1138211'
          }
        },
        location: {
          lat: '51.514947',
          lng: '-0.0930460965094679'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'Ontario',
          short_name: 'Ontario',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Southwestern Ontario',
          short_name: 'Southwestern Ontario',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'N6B 2P8',
          short_name: 'N6B 2P8',
          types: [
            'postal_code'
          ]
        },
        {
          long_name: 'Canada',
          short_name: 'Canada',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, ON N6B 2P8, Canada',
      geometry: {
        bounds: {
          northeast: {
            lat: '43.148576',
            lng: '-81.086643'
          },
          southwest: {
            lat: '42.828576',
            lng: '-81.406643'
          }
        },
        location: {
          lat: '42.988576',
          lng: '-81.246643'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'Ontario',
          short_name: 'Ontario',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'Southwestern Ontario',
          short_name: 'Southwestern Ontario',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'Canada',
          short_name: 'Canada',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'Southwestern Ontario, ON, Canada',
      geometry: {
        bounds: {
          northeast: {
            lat: '43.0730461',
            lng: '-81.1070784'
          },
          southwest: {
            lat: '42.824599',
            lng: '-81.3906556'
          }
        },
        location: {
          lat: '42.9537654',
          lng: '-81.2291529'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'Laurel County',
          short_name: 'Laurel County',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'Kentucky',
          short_name: 'Kentucky',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: '40741',
          short_name: '40741',
          types: [
            'postal_code'
          ]
        },
        {
          long_name: 'United States of America',
          short_name: 'United States of America',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, KY 40741, United States of America',
      geometry: {
        bounds: {
          northeast: {
            lat: '37.15226',
            lng: '-84.035957'
          },
          southwest: {
            lat: '37.079759',
            lng: '-84.126262'
          }
        },
        location: {
          lat: '37.1289771',
          lng: '-84.0832646'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'Madison County',
          short_name: 'Madison County',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'Ohio',
          short_name: 'Ohio',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: '43140',
          short_name: '43140',
          types: [
            'postal_code'
          ]
        },
        {
          long_name: 'United States of America',
          short_name: 'United States of America',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, OH 43140, United States of America',
      geometry: {
        bounds: {
          northeast: {
            lat: '39.921786',
            lng: '-83.389997'
          },
          southwest: {
            lat: '39.85928',
            lng: '-83.478923'
          }
        },
        location: {
          lat: '39.8864493',
          lng: '-83.448253'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'Pope County',
          short_name: 'Pope County',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'Arkansas',
          short_name: 'Arkansas',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'United States of America',
          short_name: 'United States of America',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, AR, United States of America',
      geometry: {
        bounds: {
          northeast: {
            lat: '35.3389327',
            lng: '-93.1874567'
          },
          southwest: {
            lat: '35.3169503',
            lng: '-93.2716305'
          }
        },
        location: {
          lat: '35.328973',
          lng: '-93.2529553'
        }
      }
    },
    {
      address_components: [
        {
          long_name: 'Tulare County',
          short_name: 'Tulare County',
          types: [
            'administrative_area_level_2',
            'political'
          ]
        },
        {
          long_name: 'North America',
          short_name: 'North America',
          types: [
            'continent'
          ]
        },
        {
          long_name: 'California',
          short_name: 'California',
          types: [
            'administrative_area_level_1',
            'political'
          ]
        },
        {
          long_name: 'London',
          short_name: 'London',
          types: [
            'locality',
            'political'
          ]
        },
        {
          long_name: 'United States of America',
          short_name: 'United States of America',
          types: [
            'country',
            'political'
          ]
        }
      ],
      formatted_address: 'London, CA, United States of America',
      geometry: {
        bounds: {
          northeast: {
            lat: '36.4884367',
            lng: '-119.4385395'
          },
          southwest: {
            lat: '36.4734452',
            lng: '-119.4497699'
          }
        },
        location: {
          lat: '36.4760619',
          lng: '-119.4431785'
        }
      }
    }
  ],
  status: 'OK'
}

module.exports = {
    locationFixture,
    geocodeFixture
}