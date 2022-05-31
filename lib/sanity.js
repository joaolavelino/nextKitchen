import {
  createClient,
  createPreviewSubscriptionHook,
  createPortableTextComponent,
} from "next-sanity";

import createImageUrlBuilder from "@sanity/image-url";

const config = {
  projectId: "h2li9kfq", //from 'sanity.json'
  dataset: "production", //also from 'sanity.json'
  apiVersion: "2021-03-25", // check on the section API Versioning on the Sanity Docs - changelog
  useCdn: false,
};

export const sanityClient = createClient(config);

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// export const PortableText = createPortableTextComponent({
//   ...config,
//   serializers: {},
// });
