---
title: DDoS Attack Explained
date: 2022-04-22
category: Computer Science
description: How can web services avoid malicious attacks?
ogp: /ogp.webp
---
<div class="message">
This is one of the assignment I got in a journalism class. The content might be not as straightforward as you expect, since I needed to meet the requirement of the assignment such as word count and way of writing.
</div>

The number of attacks attempted on the internet is increasing rapidly along with the number of websites, especially after people start using the internet way more than before due to covid. Of the countless number of types of attacks, I am going to pick one of them called Distributed Denial-of-Service Attack (DDoS Attack), since DDoS Attack is one of the most notorious attacks, and write my opinion on how you can avoid this type of attack.

## How it works

DDoS Attack is the way of attack where an attacker sends tons of page requests to a target server using what is called botnet until it goes offline or at least inaccessible. To understand how DDoS Attack works, you first need to comprehend the idea of network architecture and how websites work.

### Basic components of the internet
The structure of the current internet is often described with the OSI Reference Model, where the components forming the internet are separated by their role as follows:

1. Physical Layer… is responsible for transmitting optical signals between entities, such as an Ethernet cable, a network switch or a submarine cable.

2. Data Link Layer… is responsible for organizing data transferred through the physical layer. You can think of this layer as the one that handles the optical data and converts it into digital data.

3. Network Layer… is responsible for establishing connections between two entities. This layer includes IP Protocol, which determines IP addresses, and routing.

4. Transport Layer… provides the protocol for data communication. The representative protocols for this layer are TCP and UDP, which determine the way your computer sends data depending on the occasion such as whether you need to send it quickly or accurately.

5. Session Layer… is responsible for establishing and terminating a session. In my opinion, this layer is mostly merged into the Application Layer on the current internet.

6. Presentation Layer… provides protocols for data types. JPEG or PNG, GIF for image data are good examples.

7. Application Layer… is responsible for getting input from the end user. HTTP is the most representative protocol for this layer although there are also other protocols such as DNS, POP and SMTP

When you access a website, your computer sends multiple requests to the server that has the data for the website, after your computer found the corresponding IP address to the URL on DNS protocol. The first few requests are for handshake, where two computers agree with what protocols they are going to use for communication since the protocol must be available on both. A single request will be split into multiple “packets” and sent separately. Splitting a request and reforming a request after receiving all the packets are the responsibility of the Transport Layer.

![image](https://lh3.googleusercontent.com/9qfbeYQN6cu8NXglcyjKiBvvda6hA7ah42WHapSwTH22Y4eYWFAy8Skev_KrvZBnagIWfzJSegMPw_p-gkvqKJ6k55WFHwGxr2O7UxYfkltM039C5BFOc5HlHSYK3zQ812D7Z9mw)

### DoS vs DDoS

In Denial-of-Service Attack (DoS Attack, not DDoS Attack!), an attacker can attack on either Transport Layer or Application Layer. He can simply attack the Application Layer by keeping clicking the reload button on the web browser. It is called HTTP Flood. For the attack to Transport Layer, he only sends the very first request of the handshake so that it is quicker than HTTP Flood. This type of attack is called SYN Flood; the first request of the handshake is called SYN.

When it comes to “Distributed” DoS Attack, the attacker first takes control of tons of computers on the internet using malware. Then he operates those to DoS Attack the target website. A group of those computers taken control are called a botnet. What is worse in the DDoS Attack is the victim cannot find out who the attacker is, since attacks are done by a whole bunch of computers that are not even geographically close to each other.

### Recent attack

On Friday 8 April, DDoS Attack was conducted against the websites of Finland’s Ministry of Foreign Affairs and Ministry of Defense. According to SecurityScoreCard threat researchers, it was the work of a botnet dubbed Zhadnost, which they have discovered recently. The attack was done by over 350 unique IP addresses, and most of their routers are MikroTik, which is a Latvia-based manufacturer of routing and firewall hardware and is known for recently discovered vulnerabilities. Since the attack was at the same time as Ukrainian president Zelensky was delivering an address to the Finnish parliament, SecurityScoreCard threat researchers said “[The attack] was likely orchestrated by Russian or pro-Russian actors”.

### How we can prevent

Although DDoS Attack is almost impossible to find out the actual attacker, we can prevent this type of attack in several ways.

First, we can stop using vulnerable routers. If, hypothetically, all people use secure routers there can not be any malware that targets routers. However, even if it actually happens, we still need to pay attention not to open a suspicious email and not to download unverified software because a botnet can still be made by using a computer virus that targets users such as Emotet.

Second, you can use Internet Service Providers (ISPs) that provide DDoS protection. In case of SYN Flood, the developer of the target website can not even deal with the attack since the handshake, which will not be done, is mainly on Transport Layer. Instead, the developer can rely on ISPs that can protect the website from DDoS Attack. DDoS protection on Network Layers is full of variety, and all of them require a very high level of knowledge about security, network architecture and computer science. I am not going to explain them here, but it is worth mentioning because attacks have been blocked by them so many times since the internet was created.

## References
#### About the incident on April 8

[https://www.computerweekly.com/news/252515952/Zhadnost-DDoS-botnet-deployed-against-Finland](https://www.computerweekly.com/news/252515952/Zhadnost-DDoS-botnet-deployed-against-Finland#:~:text=A%20distributed%20denial%20of%20service,SecurityScorecard%20(SSC)%20threat%20researchers)

[https://www.infosecurity-magazine.com/news/finland-government-sites-offline/](https://www.infosecurity-magazine.com/news/finland-government-sites-offline/)

#### About DDoS Attack

[https://developers.cloudflare.com/ddos-protection/](https://developers.cloudflare.com/ddos-protection/)

[https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/)

#### About OSI Reference Model

[https://spectrum.ieee.org/osi-the-internet-that-wasnt](https://spectrum.ieee.org/osi-the-internet-that-wasnt)

[https://docs.oracle.com/cd/E19455-01/806-1017/6jab5di2d/index.html](https://docs.oracle.com/cd/E19455-01/806-1017/6jab5di2d/index.html)
