
    import { Helmet } from 'react-helmet-async';

    const SEO = ({ title, description, name, type }) => {
      return (
        <Helmet>
          { /* Standard metadata tags */ }
          <title>{title}</title>
          <meta name='description' content={description} />
          
          { /* Open Graph tags for social media (Facebook, LinkedIn, etc.) */ }
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content={type || 'website'} />
          <meta property="og:site_name" content={name || 'Credential Keep'} />
          
          { /* Twitter card tags */ }
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@Chanikya" /> {/* Optional: Add your Twitter handle */}
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      );
    };

    export default SEO;
    
