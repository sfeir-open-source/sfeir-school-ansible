<!-- .slide: class="transition"-->  

# En production

##==##

<!-- .slide: class="with-code" -->

# En production
<br/>

## L'inventaire

Le concept d'inventaire a déjà été abordé un peu plus tôt.  
Cependant, il est nécessaire de le développer.  
Il est nécessaire qu'Ansible puisse connaître l'identité des serveurs sur lesquels il va déployer les middlewares.  

Cet inventaire peut se présenter sous deux formes différentes :
* **Statique**, un simple fichier *INI* ou *YAML*
* **Dynamique**

##==##
<!-- .slide: -->

# En production
<br/>

## Inventaire Statique

Sur un inventaire statique, nous avons besoin des paramètres suivants : 

| paramètres | values | requis |
| ---------- | ------ | ------ |
| ansible_connection | ssh/winrm/localhost | oui |
| ansible_host | le nom du host auquel se connecter | oui |
| ansible_port | les ports SSH ou winrm définis sur les machines ciblées | oui - uniquement si les ports ne sont pas ceux par défaut |
| ansible_user | root ou administrator (Windows) ou tout autre user ayant des droits assez élevés | non |
| ansible_ssh_pass | Mot de passe de l'utilisateur admin | non |

Notes:
Ce sont les paramètres les plus courants dans un inventaire statique.
D'autres paramètres, en rapport avec le type de connexion (SSH ou non-SSH) ou avec l'élévation des privilèges ou avec les paramètres d'environnement.
Dans le cas d'une connexion NON-SSH, il s'agit de local ou de docker

##==##
<!-- .slide: -->

# En production
<br/>

## Inventaire Statique

**Important**
* Ansible peut utiliser deux formes d'inventaire statique différent : **INI** ou **YAML**
* Si vous travaillez avec plusieurs environnements, il est recommandé d'utiliser plusieurs inventaires
* Comme évoqué un peu plus tôt, vous pouvez grouper vos *managed nodes*
* Et utiliser des variables spécifiques à ces groupes

Notes:
- L'inventaire YAML est une reproduction de l'inventaire INI.
- lorsque vous invoquez la commande ansible-playbook, c'est à ce moment que vous préciserez l'inventaire à utiliser.
- certains groupes peuvent contenir des managed nodes d'autres groupes, vous pouvez également créer des groupes enfants
- si les variables en question sont stockées dans un dossier group_vars/[GROUP_NAME]/settings.yaml

##==##
<!-- .slide: -->

# En production
<br/>

## Inventaire Statique

Exemple d'inventaire statique:
```
[targets]

localhost              ansible_connection=local
other1.example.com     ansible_connection=ssh        ansible_user=myuser
other2.example.com     ansible_connection=ssh        ansible_user=myotheruser
```

##==##
<!-- .slide: -->

# En production
<br/>

## L'inventaire dynamique
### Les scripts
Les inventaires dynamiques se présentent sous deux formes selon le provider cloud sur lequel Ansible va déployer les middlewares : 
* Un script nécessitant des identifiants pour se connecter au compte du provider Cloud,
* un plugin intégré à Ansible

Dans le cas d'un script, il faut le préciser dans la commande a exécuter : 

```bash
ansible-playbook -i [SCRIPT].py playbook.yml
```

##==##
<!-- .slide: -->
# En production
<br/>

## L'inventaire dynamique
### Les plugins

Dans le cas d'un plugin, il faut modifier la configuration d'Ansible pour que ce dernier le prenne en compte : 
```yaml
[inventory]
enable_plugins = gcp_compute
```
Modifier la configuration d'Ansible n'est qu'une indication pour Ansible, il faut aussi configurer le plugin pour affiner son fonctionnement : 
```yaml
plugin: gcp_compute
projects:
  - <gcp_project_id>
regions:
  - <gcp_project_region>
hostnames:                # A list of options that describe the ordering for which hostnames should be assigned. Currently supported hostnames are 'public_ip', 'private_ip', or 'name'.
  - name
filters: []
auth_kind: serviceaccount
service_account_file: <service_account_file>.json
```

Notes:
Ansible gère de manière différente les inventaires dynamique de Cloud Provider.
GCP est le seul provider a disposer d’un plugin fonctionnel parmi les 3 les plus demandés sur le marché.
Les groupes statiques et dynamiques sont également gérés dans le cas d'inventaires dynamique, tout dépend de la configuration
Pour démarrer ansible avec un plugin d'inventaire dynamique, après avoir configuré ansible et le plugin, ajouter '-i [CONFIG_PLUGIN].yml' à la commande.

##==##

<!-- .slide: -->

# En production
<br/>

## Déploiment continu
Parmi les outils de CICD, seul Jenkins dispose d’un plugin ansible permettant d’exécuter un playbook et de déchiffrer des secrets.
Si vous devez déployer sur plusieurs environnements, vous pouvez créer un fichier de variable par environnement qui seront “appelés” au moment de l’exécution du playbook.

Notes:
Peu importe l'outil de CICD sur lequel on est le plus familiarisé.
Jenkins semble être le seul à proposer un plugin pour Ansible gérant à la fois les commandes "ansible-playbook" et "ansible-vault".
Cependant, avec les autres outils de CICD, on peut démarrer les playbook de la même manière que via une ligne de commande classique.

##==##

<!-- .slide: -->

# En production
<br/>

## Déploiement continu
### Cas pratique : Ansible Tower et les Webhooks
Un webhook permet d'exécuter une commande spécifiée entre plusieurs appliances sur Internet.  
Ansible Tower propose l'intégration des *webhook* **Gitlab** et **Github**.

Le principe est le suivant : 
* On défini un token **GitHub/Gitlab** avec les autorisations adequates
* On crée des identifiants pour **Github/Gitlab** dans **Ansible Tower**
* On crée ensuite le webhook avec le **Webhook Key** provenant de **Ansible Tower**

Notes: 
Une démo est prévue avant l'atelier

##==##
<!-- .slide: -->

# En production
<br/>

## Les bastions
Ansible communique avec les machines de l'inventaire via SSH.  
En précisant, dans le fichier de configuration d'ansible quelle configuration ssh utiliser pour se connecter aux serveurs cibles, ansible l'utilisera pour les provisionner.

![h-400:center](./assets/images/bastion.png)

Notes:
Ainsi, le bastion conserve sa fonction de jump host.

##==##
<!-- .slide: class="with-code" -->

# En production
<br/>

## Les bastions
### Configuration d'ansible
<!-- .slide: class="with-code-bg-dark" .element: class="center" -->
```
[ssh_connection]
ssh_args = -F ssh.cfg
control_path = ~/.ssh/mux-%r@%h:%p
```
### Configuration SSH
```
Host bastion
 Hostname 84.39.41.33
 User admin
 IdentityFile /home/you/.ssh/your_key.pem

Host 192.168.47.*
 ProxyCommand ssh -F ssh.cfg -W %h:%p bastion
 User admin
```

Notes:
Cela fonctionne aussi bien pour les inventaires statiques et dynamiques.
