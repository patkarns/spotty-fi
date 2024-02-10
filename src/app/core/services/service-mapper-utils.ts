import { first } from 'lodash';

import { SpotifyObject, Track } from '../state/tracks';
import { TrackApiResponse } from './tracks.service';

export function mapTrackApiResponsesToTrack(
  trackApiResponse: TrackApiResponse
): Track {
  return {
    name: trackApiResponse.name,
    id: trackApiResponse.id,
    popularity: trackApiResponse.popularity,
    imageUrl: first(trackApiResponse.album.images)?.url,
    uri: trackApiResponse.uri,
    type: trackApiResponse.type,
    album: {
      name: trackApiResponse.album.name,
      id: trackApiResponse.album.id,
      uri: trackApiResponse.album.uri,
    } as SpotifyObject,
    artists: trackApiResponse.artists.map(
      (artistResponse) =>
        ({
          name: artistResponse.name,
          id: artistResponse.id,
          uri: artistResponse.uri,
          type: artistResponse.type,
        } as SpotifyObject)
    ),
  } as Track;
}
