import { Cover } from '../Core/Cover'
import { Heading } from '../Core/Heading'
import { Paragraph } from '../Core/Paragraph'
import { CallToActionButton } from '../Custom/CallToActionButton'
import { Columns } from '../Core/Columns'
import { Column } from '../Core/Column'
import { Theme } from '../../lib/theme'
import { Spacer } from '../Core/Spacer'
import { Gallery } from '../Core/Gallery'
import { Query } from '../Core/Query'
import { Group } from '../Core/Group'
import { Services } from '../Custom/Services'
import { GravityFormsComponent } from '../GravityForms/GravityFormsFields'
import { List } from '../Core/List'
import { ListItem } from '../Core/List/ListItem'
import { HeadingLabel } from '../Custom/HeadingLabel'
import { BuyingPoint } from '../Custom/BuyingPoint'
import { ImageHighlight } from '../Custom/ImageHighlight'
import { Highlights } from '../Custom/Highlights'
import { Carousel } from '../Custom/Carousel'
import { CallToActionBar } from '../Custom/CallToActionBar'
import { Tile } from '../Custom/Tile'
import { PricingBlock } from '../Custom/PricingBlock'
import { ImageText } from '../Custom/ImageText'
import { Features } from '../Custom/Features'
import { ScrollingBullets } from '../Custom/ScrollingBullets'
import { MiniCover } from '../Custom/MiniCover'
import { IDDiv } from '../Custom/IDDiv'
import { Logos } from '../Custom/Logos'
import { Card } from '../Custom/Card'
import { Faq } from '../Custom/Faq'
import { Benefits } from '../Custom/Benefits'
import { Calendly } from '../Custom/Calendly'
import { G_Reviews } from '../Custom/G_Reviews'
import { ServiceHighlights } from '../Custom/ServiceHighlights'
import mapACFRepeater from '../../lib/mapACFRepeater'
import Image from 'next/image'

export const BlockRenderer = ({ blocks }) => {
    return blocks.map(block => {
        switch (block.name) {

            case "acf/cart": {
                console.log(block)
                return <CartPage></CartPage>
            }

            // Gravity Forms form handling. Custom form creation, submission and validation.

            case "gravityforms/form": {
                return <GravityFormsComponent formId={block.attributes.formId}></GravityFormsComponent>
            }

            // Advanced Custom Fields. Custom gutengberg components that are defined using advanced custom fields. 

            case "acf/ctabutton": {
                return <CallToActionButton
                    key={block.id}
                    buttonLabel={block.attributes.data.label}
                    destination={block.attributes.data.destination || "/"}
                    align={block.attributes.data.align}
                    type={block.attributes.data.type}
                ></CallToActionButton>
            }

            case "acf/benefits": {
                return <Benefits benefits={mapACFRepeater(block.attributes.data)}>
                </Benefits>
            }

            case "acf/service-highlights": {
                return <ServiceHighlights 
                image={block.attributes.data.image} 
                title={block.attributes.data.title} 
                description={block.attributes.data.description} 
                destination={block.attributes.data.destination
                }>
                </ServiceHighlights>
            }

            case "acf/faq" : {
                return <Faq list={mapACFRepeater(block.attributes.data)}>

                </Faq>
            }

            case "acf/call-to-action-bar": {
                return <CallToActionBar
                    title={block.attributes.data.title}
                    paragraph={block.attributes.data.paragraph}
                    image={block.attributes.data.image}
                    button_text={block.attributes.data.button_text}
                    button_destination={block.attributes.data.button_destination}
                    onlineImage={block.attributes.data.online}
                >

                </CallToActionBar>
            }

            case "acf/logos": {
                return <Logos
                    logo_1={block.attributes.data.logo_1}
                    logo_1_link={block.attributes.data.logo_1_link}
                    logo_2={block.attributes.data.logo_2}
                    logo_2_link={block.attributes.data.logo_2_link}
                    logo_3={block.attributes.data.logo_3}
                    logo_3_link={block.attributes.data.logo_3_link}
                    logo_4={block.attributes.data.logo_4}
                    logo_4_link={block.attributes.data.logo_4_link}
                    logo_5={block.attributes.data.logo_5}
                    logo_5_link={block.attributes.data.logo_5_link}
                    logo_6={block.attributes.data.logo_6}
                    logo_6_link={block.attributes.data.logo_6_link}
                >

                </Logos>
            }


            case "acf/tile": {
                return <Tile
                    title={block.attributes.data.title}
                    text={block.attributes.data.text}
                    buttonText={block.attributes.data.buttontext}
                    colour={block.attributes.data.colour}
                    textColour={block.attributes.data.textcolour}
                    buttonDestination={block.attributes.data.buttondestination}
                >
                </Tile>
            }

            case "acf/card" : {
                return <Card
                    image={block.attributes.data.image}
                    title={block.attributes.data.title}
                    description={block.attributes.data.description}
                    showbutton={block.attributes.data.showbutton}
                    call_to_action={block.attributes.data.call_to_action}
                    destination={block.attributes.data.destination}
                >
                </Card>
            }
            
            case "acf/carousel": {
                return <Carousel data={mapACFRepeater(block.attributes.data)} visibleitems={parseInt(block.attributes.data.visibleitems)}></Carousel>
            }

            case "acf/features": {
                return <Features mainTitle={block.attributes.data.maintitle} featuresArray={mapACFRepeater(block.attributes.data)} color={block.attributes.data.color} ></Features>
            }

            case "acf/iddiv": {
                return <IDDiv id={block.attributes.data.id}></IDDiv>
            }

            case "acf/image-highlight": {
                return <ImageHighlight
                    image={block.attributes.data.image.url}
                    imageWidth={block.attributes.data.image.width}
                    imageHeight={block.attributes.data.image.height}
                    imageAlt={block.attributes.data.image.alt}
                    accent={block.attributes.data.accent_title}
                    title={block.attributes.data.title}
                    paragraph={block.attributes.data.paragraph}
                    row_1={block.attributes.data.row_1}
                    row_2={block.attributes.data.row_2}
                    row_3={block.attributes.data.row_3}
                >

                </ImageHighlight>
            }

            case "acf/g-reviews" : {
                return <G_Reviews reviews={mapACFRepeater(block.attributes.data)}></G_Reviews>
            }

            case "acf/services": {
                return <Services data={mapACFRepeater(block.attributes.data)}></Services>
            }

            case "acf/minicover": {
                return (
                    <MiniCover 
                        image={block.attributes.data.image}
                        title={block.attributes.data.title}
                        description={block.attributes.data.description}
                        showbutton={block.attributes.data.showbutton}
                        buttondestination={block.attributes.data.buttondestination}
                        buttontext={block.attributes.data.buttontext}
                        showscroll={block.attributes.data.showscrollbutton}
                        idscroll={block.attributes.data.idscroll}
                    ></MiniCover>
                )
            }

            case "acf/calendly": {
                return <Calendly calendlyURL={block.attributes.data.calendlyURL}>
                </Calendly>
            }

            case "acf/pricing-block": {
                return <PricingBlock
                    button_destination={block.attributes.data.button_destination}
                    title={block.attributes.data.title}
                    price={block.attributes.data.price}
                    description={block.attributes.data.description}
                    discount={block.attributes.data.discount}
                    button_text={block.attributes.data.button_text}
                    checklist={mapACFRepeater(block.attributes.data)}
                >

                </PricingBlock>
            }

            case "acf/image-text": {
                return <ImageText
                    title={block.attributes.data.title}
                    header={block.attributes.data.header}
                    description={block.attributes.data.description}
                    button_text={block.attributes.data.button_text}
                    destination={block.attributes.data.link_destination}
                    image={block.attributes.data.image}
                >

                </ImageText>
            }

            // Custom Call to Action Button (External Sites)
            case "acf/externalctabutton": {
                return <CallToActionButton
                    color={"#F1B007"}
                    key={block.id}
                    buttonLabel={block.attributes.data.label}
                    destination={block.attributes.data.destination?.url}
                    target={"_blank"}
                    align={block.attributes.data.align}
                ></CallToActionButton>
            }

            case "acf/heading-label": {
                return <HeadingLabel
                    textAlign={block.attributes.data.align}
                    content={block.attributes.data.text}
                    color={block.attributes.data.color}
                >

                </HeadingLabel>
            }

            case "acf/scrolling-bullets": {
                return <ScrollingBullets bullets={mapACFRepeater(block.attributes.data)}>

                </ScrollingBullets>
            }

            case "acf/buying-point": {
                return <BuyingPoint
                    color={block.attributes.data?.color}
                    description={block.attributes.data.description}
                    number={block.attributes.data.number}
                ></BuyingPoint>
            }

            case "acf/highlights": {
                return  <Highlights
                     title_heading = {block.attributes.data.title_heading}
                     title_explanation = {block.attributes.data.title_explanation}
                     checklist_descriptions = {mapACFRepeater(block.attributes.data)}
                     image_area = {block.attributes.data.image_area}
                 ></Highlights>
             }

             // Core gutenberg components. Most are complete, some are not available due to precedence.

            case "core/list": {
                return <List key={block.id}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </List>
            }

            case "core/list-item": {
                return <ListItem key={block.id} content={block.originalContent}></ListItem>
            }

            case "core/query": {
                <Query key={block.id}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Query>
            }

            case "core/gallery": {
                return <Gallery key={block.id} columns={block.attributes.columns || 3} cropImages={block.attributes.imageCrop} items={block.innerBlocks}></Gallery>
            }

            case "core/spacer": {
                return <Spacer key={block.id} height={block.attributes.height || "81px"}></Spacer>
            }

            case "core/paragraph": {
                return <Paragraph
                    className={block.attributes.className}
                    key={block.id}
                    textAlign={block.attributes.align}
                    content={block.attributes.content}
                    fontSize={block.attributes.style?.typography?.fontSize}
                    textColor={Theme[block.attributes.textColor] || block.attributes.style?.color?.text}
                ></Paragraph>
            }

            case "core/post-title": {
                return <Heading
                    key={block.id}
                    textAlign={block.attributes.textAlign}
                    content={block.attributes.content}
                    level={block.attributes.level}
                />
            }

            case "core/heading": {
                return <Heading
                    className={block.attributes.className}
                    typography={block.attributes?.style?.typography}
                    key={block.id}
                    textColor={block.attributes?.textColor}
                    textAlign={block.attributes.textAlign}
                    content={block.attributes.content}
                    level={block.attributes.level}
                />
            }

            case "core/cover": {
                return <Cover className={block.attributes?.className} key={block.id} background={block.attributes.url}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Cover>
            }

            case "core/columns": {
                return <Columns padding={block.attributes.style?.spacing?.padding} className={block.attributes?.className} key={block.id} stackOnMobile={block.attributes.isStackedOnMobile}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Columns>
            }

            case "core/column": {
                return <Column padding={block.attributes.style?.spacing?.padding} bgColor={block.attributes.style?.color?.background} className={block.attributes?.className} layout={block.attributes?.layout || ""} verticalAlignment={block.attributes.verticalAlignment || false} key={block.id} width={block.attributes.width}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Column>
            }

            case "core/group": {
                return <Group
                    border={block.attributes.style?.border}
                    padding={block.attributes.style?.spacing?.padding}
                    className={block.attributes.className}
                    contentSize={block.attributes.layout?.contentSize}
                    bgColor={block.attributes?.style?.color?.background}
                    justification={block.attributes?.layout?.justifyContent}
                    radius={block.attributes?.style?.border?.radius}
                    keys={block.id}>
                    <BlockRenderer blocks={block.innerBlocks}></BlockRenderer>
                </Group>
            }

            case "core/block": {
                return <BlockRenderer keys={block.id} blocks={block.innerBlocks}>
                </BlockRenderer>
            }

            case "core/image": {
                return (
                    <div className={""}>
                        <Image
                            key={block.id}
                            src={block.attributes.url}
                            height={block.attributes.height}
                            width={block.attributes.width}
                            alt={block.attributes.alt || ""}
                            className={block.attributes.className || ""}
                        />
                    </div>

                )
            }

            default: {
                console.log(block)
                return null;
            }
        }
    })
} 